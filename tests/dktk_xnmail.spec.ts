import { chromium, Browser, Page } from 'playwright';
import axios from 'axios';

const emailAddress = 'your-temporary-email@mailinator.com';
const mailinatorApiKey = 'YOUR_MAILINATOR_API_KEY'; // Thay thế bằng API key của bạn

(async () => {
  // Khởi tạo trình duyệt và trang
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Mở trang web và đăng ký tài khoản
  await page.goto('https://example.com/register');
  await page.fill('input[name="email"]', emailAddress);
  await page.fill('input[name="password"]', 'YourPassword123');
  await page.click('button[type="submit"]');

  // Chờ email xác nhận
  const getVerificationLink = async () => {
    const response = await axios.get(`https://api.mailinator.com/api/v2/domains/public/inboxes/${emailAddress.split('@')[0]}/messages`, {
      headers: { 'Authorization': `Bearer ${mailinatorApiKey}` }
    });
    const messages = response.data.messages;
    if (messages.length === 0) {
      throw new Error('No messages found');
    }
    const messageId = messages[0].id;
    const messageResponse = await axios.get(`https://api.mailinator.com/api/v2/domains/public/messages/${messageId}`, {
      headers: { 'Authorization': `Bearer ${mailinatorApiKey}` }
    });
    const verificationLinkMatch = messageResponse.data.data.parts[0].body.match(/https:\/\/example\.com\/verify\?token=[a-zA-Z0-9]+/);
    if (!verificationLinkMatch) {
      throw new Error('Verification link not found in email');
    }
    return verificationLinkMatch[0];
  };

  let verificationLink = '';
  for (let i = 0; i < 10; i++) {
    try {
      verificationLink = await getVerificationLink();
      break;
    } catch (e) {
      console.log(e.message);
      await new Promise(res => setTimeout(res, 5000)); // Chờ 5 giây trước khi thử lại
    }
  }

  if (verificationLink === '') {
    throw new Error('Failed to get verification link');
  }

  // Mở trang xác nhận
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.goto(verificationLink)
  ]);

  // Chờ trang xác nhận tải xong và thực hiện các bước tiếp theo nếu cần
  await newPage.waitForLoadState();
  console.log(await newPage.title());

  // Đóng trình duyệt
  await browser.close();
})();

//// cách 2 luông đk email address xác nhận 

async function registerAndConfirmAccount() {
    let browser: Browser;
    let page: Page;
  
    try {
      // Khởi tạo trình duyệt và trang mới
      browser = await chromium.launch({ headless: false });
      page = await browser.newPage();
  
      // Bước 1: Đăng ký tài khoản
      await page.goto('https://example.com/register'); // Thay đổi URL phù hợp
      await page.fill('input[name="username"]', 'username');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'password');
      await page.click('button[type="submit"]');
  
      // Bước 2: Nhận email xác nhận từ Mailinator (ví dụ)
      await page.goto('https://www.mailinator.com/v4/public/inboxes.jsp?to=test#/');
      await page.fill('input[name="inbox"]', 'test'); // Đổi 'test' thành tên hòm thư tạm thời của bạn
      await page.click('button[type="submit"]');
  
      // Chờ và lấy liên kết xác nhận từ email
      await page.waitForSelector('ul.emailList li');
      const emailLink = await page.$eval('ul.emailList li a', (el) => el.getAttribute('href'));
      
      // Bước 3: Xác nhận tài khoản bằng cách mở liên kết xác nhận
      if (emailLink) {
        await page.goto(emailLink);
        console.log('Account confirmed successfully.');
      } else {
        console.error('Confirmation link not found.');
      }
  
      // Chờ và thực hiện các thao tác khác sau khi xác nhận tài khoản
  
    } catch (error) {
      console.error('Error during registration and confirmation:', error);
    } finally {
      // Đóng trình duyệt
    //   await browser?.close();
    }
  }
  