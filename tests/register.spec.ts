import { chromium, expect, test } from "@playwright/test";

// test.afterEach(async ({page})=>{
//     await   page.pause()
// })
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
const randomString3 = generateRandomString(3);


test("hanlde muntil page", async ({ }) => {
    const browser = await chromium.launch();
    const Context = await browser.newContext();

    const page1 = await Context.newPage()
    const page2 = await Context.newPage()
    const page3 = await Context.newPage()

    const allPages = Context.pages()

    
    
    await   page1.goto('https://dropmail.me/en')
    await   page1.waitForTimeout(2000)
    const   tenmail = await page1.locator('[class="address"]').textContent()
    console.log(`${tenmail}`)

    // await   page1.goto('https://10minutemail.net/')
    // // await   page1.waitForTimeout(2000)
    // await   page1.locator('//button[@class="fc-button fc-cta-consent fc-primary-button"]').click()
    // const   tenmail = await page1.locator('#fe_text').textContent()
    // await   page1.getByRole('button', { name: ' Copy to clipboard' }).click()
    // // console.log(`${tenmail}`)
  




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
    // await page2.keyboard.down('Control');
    // await page2.keyboard.press('KeyV'); // Paste
    // await page2.keyboard.up('Control');
    await   email.fill(`${tenmail}`)


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

    // await   expect(page1.getByText(`${tenmail}`)).toBeVisible()
    await   page1.waitForTimeout(5000)
    await expect(page1.getByText('[TeamHub]Cảm ơn đã đăng ký sử dụng dịch vụ')).toBeVisible()
    // await   page1.waitForTimeout(10000)
    // await expect(page1.getByRole('link', { name: '[TeamHub] Thông báo về việc kích hoạt' })).toBeVisible()
    // await   page1.waitForLoadState()


    

    
    
    // await expect(page1.getByText('[TeamHub]Cảm ơn đã đăng ký s')).toBeVisible()
    
    // const thongbaokichhoat =await page1.getByText('Thông báo về việc kích hoạt tài khoản Doanh nghiệp')
    // await expect(thongbaokichhoat).toBeVisible()
    // const clickvaolinkdoimatkhau =await  page1.getByRole('link', { name: 'ct.sendgrid.net/ls/click?upn' }).first()
    // await clickvaolinkdoimatkhau.click()
    // await expect(page1.getByRole('heading', { name: 'Your temporary email:' })).toBeVisible()
    
    // await expect(page1.getByText('[TeamHub]Cảm ơn đã đăng ký s')).toBeVisible()
    // await page1.waitForTimeout(3000)
    // await page1.waitForSelector('a')
    // await page1.waitForTimeout(5000)
    // await expect(page1.getByText('[TeamHub]Thông báo về việc kích hoạt')).toBeVisible()



    await page1.pause()




})
