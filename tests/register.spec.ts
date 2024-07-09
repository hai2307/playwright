import { test, expect, chromium ,Page } from '@playwright/test';   
import axios from 'axios';
// vài trang này đk tk : https://org-console.iam-center.dev-tokyotechlab.com/register
// vào trang https://dropmail.me/en/  tạo email

// sau đó vào trang https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization ,đk với tk adim
// và kích hoạt tk 
// sau đó vào mail kich -> tọa mk mới thành công 
// sau đó quay lại mail _ -> click vào link đnag nhập
// sau đó vào nhân viên và xem tk đã đang kí thành công 
// sau đó vào trang dev admin https://admin-console.iam-center.dev-tokyotechlab.com/admin/organization kích haotj tk 
// sau đó quay lại trnag hrm ,,https://kali.hrm.dev-tokyotechlab.com/user vừa tạo tạo vai trò 
// sau đó  https://krixi.org-console.iam-center.dev-tokyotechlab.com/user  tạo người dùng mới 


function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

const randomString = generateRandomString(5);
const randomString3 = generateRandomString(3)
const randommail = generateRandomString(4)

test("hanlde muntil page", async ({ }) => {
    const browser = await chromium.launch({ headless: false })
    const Context = await browser.newContext()

    const page1 = await Context.newPage()
    const page2 = await Context.newPage()
    const page3 = await Context.newPage()
    const page4 = await Context.newPage()
    const page5 = await Context.newPage()

    const allPages = Context.pages()

    await   page1.goto('https://www.mailinator.com/')
    await   page1.waitForLoadState()
    const   search= page1.locator('#search')
    await   search.click()
    await   search.fill(`${randommail}`)
    await   page1.locator('[value="Search for public inbox for free"]').click()
    await   page1.waitForLoadState()
    const   tenmail = await   page1.locator('#inbox_field').textContent()
    console.log(`${tenmail}`)

    await page2.goto('https://org-console.iam-center.dev-tokyotechlab.com/register')
    await expect(page2.locator('.register-form-title')).toBeVisible()

    const   chondichvu = await page2.locator('div:nth-child(5) > .mdi-chevron-down').first()
    await   chondichvu.click()

    const   dv_hrm = await page2.getByRole('listbox').getByText('hrm')
    await   dv_hrm.click()

    // const   dv_lms = await page2.getByRole('listbox').getByText('lms')
    // await   dv_lms.click()

    const   email = await page2.locator('#input-12')
    await   email.click()
 
    await   email.fill(`${randommail}@mailinator.com`)


    const   tendoanhnghiep = await page2.locator('#input-6')
    await   tendoanhnghiep.fill(randomString)

    const   tenmien= await page2.locator('#input-8')
    await   tenmien.fill(randomString3)

    const   nguoidaidien = await page2.locator('#input-10')
    await   nguoidaidien.fill('pham')

    const   sdt = await page2.locator('#input-14')
    await   sdt.fill('0977681123')

    const   toidongy = await page2.getByLabel('Tôi đồng ý với các điều khoản')
    await   toidongy.click()

    const   dangky = await page2.locator('[class="d-flex align-center"]')
    await   dangky.click()

    // const   dkthanhcong =await page2.getByRole('heading', { name: 'Đăng ký tài khoản thành công' })
    // await   expect(dkthanhcong).toBeVisible()

    await page3.goto('https://admin-console.iam-center.dev-tokyotechlab.com/')
    await expect(page3.locator('[class="logo"]')).toBeVisible()
    await page3.locator('//input[@name="password"]').fill('Ab@123456')
    await page3.locator('//input[@name="email"]').fill('admin@tokyotechlab.com')
    await page3.locator('//button[@type="button"]').click()
    await page3.locator('a').filter({ hasText: 'Danh sách doanh nghiệp' }).click()
    await page3.locator('//input[@placeholder="Tìm kiếm"]').fill(randomString)
    await page3.getByRole('button', { name: 'Tìm kiếm' }).click()
    await page3.getByRole('button', { name: 'Chờ phê duyệt' }).first().click()
    await page3.getByText('Kích hoạt').click()

    
    await   page1.waitForTimeout(5000)
    await   page1.waitForSelector('//tr[@ng-repeat="email in emails"]');
    await   expect(page1.locator('//tr[@ng-repeat="email in emails"]').first()).toBeVisible()

    await   page1.waitForTimeout(5000)
    await   expect(page1.getByText('[TeamHub] Thông báo về việc kích hoạt tài khoản')).toBeVisible
    await   await page1.waitForSelector('//tr[@ng-repeat="email in emails"][1]');
    await  expect(page1.locator('//tr[@ng-repeat="email in emails"][1]')).toBeVisible()
    await  page1.getByRole('cell', { name: '[TeamHub] Thông báo về việc k' }).click()
    const [newPage] = await Promise.all([
        Context.waitForEvent('page'), // Đợi trang mới mở ra
        page1.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: 'Kích hoạt' }).click()
      ]);
    // await   page1.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: 'Kích hoạt' }).click()

     // đổi mật khẩu 
    const nhapmatkhau = await newPage.locator('[placeholder="Nhập mật khẩu"]')
    await nhapmatkhau.fill('Ab@123456')
    const nhapmatkhau2 = await newPage.locator('[placeholder="Xác nhận mật khẩu mới"]')
    await nhapmatkhau2.fill('Ab@123456')
    const taomatkhau2 = await newPage.locator('[class="v-btn__content"]')
    await taomatkhau2.click()
    await newPage.waitForTimeout(5000)

    await   page1.getByRole('link', { name: 'Back to Inbox' }).click()
    await   expect(page1.getByRole('cell', { name: '[TeamHub] Thông báo kích hoạt' })).toBeVisible
    // await   page1.getByRole('cell', { name: '[TeamHub] Thông báo kích hoạt' }).click()
    // const [twoPage] = await Promise.all([
    //     Context.waitForEvent('page'), // Đợi trang mới mở ra
    //     page1.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: `https://${randomString3}.hrm.dev-` }).click()
    //   ]);
    //   await twoPage.waitForLoadState()
    // await  twoPage.getByPlaceholder('Nhập email').fill(`test${randommail}@mailinator.com`)
    // await  twoPage.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
    // await  twoPage.getByRole('button', { name: 'Đăng nhập' }).click()
    // await  twoPage.getByText('Truy cập').first().click()
    // await  expect(twoPage.getByRole('img', { name: 'coming soon' })).toBeVisible()
    // dang nhap 
    // await  newPage.waitForLoadState()
    await  newPage.waitForTimeout(26000)
    await  newPage.getByPlaceholder('Nhập email').click()
    await  newPage.getByPlaceholder('Nhập email').fill(`${randommail}@mailinator.com`)
    await  newPage.waitForTimeout(2000)
    await  newPage.getByPlaceholder('Nhập mật khẩu').fill('Ab@123456')
    await  newPage.waitForTimeout(2000)
    await  newPage.getByRole('button', { name: 'Đăng nhập' }).click()
    await  newPage.getByText('Truy cập').first().click()
    // await  expect(newPage.getByRole('img', { name: 'coming soon' })).toBeVisible()

    await page1.pause()




})
