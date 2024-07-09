import { chromium, Browser, Page } from 'playwright';
import { expect, test } from "@playwright/test";



test("click in link", async ({ page }) => {
    await   run();
    
async function run() {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
  
    // Mở trang web ban đầu
    await page.goto('https://example.com');
  
    // Click vào liên kết và chờ trang mới mở ra
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Chờ sự kiện trang mới được mở
      page.click('a[href="https://www.iana.org/domains/example"]') // Click vào liên kết (thay 'a[href="https://example.org"]' b��ng selector của liên kết bạn cần click)
    //   page.click('a[target="_blank"]') // Click vào liên kết (thay 'a[target="_blank"]' bằng selector của liên kết bạn cần click)
    ]);
  
    // Chờ cho trang mới tải xong
    await newPage.waitForLoadState();
  
    // Bây giờ bạn có thể tương tác với trang mới
    // console.log(await newPage.locator('#logo'));
    await expect(await newPage.locator('#logo')).toBeVisible()
  
    // Đóng trình duyệt
    await browser.close();
  }
  
//   run().catch(err => console.error(err));


})

