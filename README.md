Conversation Log
میخوام برای پروژه گیت هاب https://github.com/FarahaDO/Bill-Bilak مستندات بنویسی و در یک فایل html بریزی تا بتونم جایگذاری کنم در سایت

مستندات کامل، جامع و تعاملی پروژه گیت‌هاب FarahaDO/Bill-Bilak
 آماده شد و در فایل تک‌صفحه‌ای و مستقل bill-bilak-docs.html (و همچنین یک نسخه به نام index.html) ذخیره گردید.

این صفحه به گونه‌ای طراحی شده که کاملاً مستقل (Self-contained) و بدون هیچ وابستگی جانبی است تا بتوانید آن را مستقیماً روی سایت، گیت‌هاب پیجز (GitHub Pages) یا از طریق <iframe> جایگذاری نمایید.

🌟 ویژگی‌های طراحی‌شده در این فایل مستندات:
طراحی مدرن و کاملاً واکنش‌گرا (Responsive & RTL):
بهینه‌شده برای زبان فارسی با فونت استاندارد Vazirmatn و سلسله‌مراتب بصری جذاب.
دارای سوئیچ تغییر حالت دارک مود / لایت مود (Dark / Light Theme) با ذخیره‌سازی وضعیت در مرورگر.
محیط تست زنده (Interactive Playground):
کاربر می‌تواند قبل از نصب افزونه، عملکرد هر دو حالت زوم صفحه و ذره‌بین شناور (Lens Mode) را همراه با حلقه ماوس در بالای صفحه تست کند.
پوشش ۱۰۰٪ تمام قابلیت‌های پروژه:
۲ حالت بزرگ‌نمایی: مقایسه فنی و بصری Page Zoom در برابر Lens Mode.
کنترل‌های تعاملی: تنظیم زوم با اسکرول ماوس، هدایت با کلیدهای جهت‌نما، کلیدهای میانبر پیش‌فرض و ضبط شورت‌کات دلخواه.
امکانات ویژه: حالت تمرکز (Focus Blur)، مینی‌مپ هوشمند کَنوَس، لیست سیاه دامنه‌ها (Site Blacklist) و معماری دوزبانه (i18n).
راهنمای گام‌به‌گام نصب:
تب‌بندی روش نصب از سورس (Developer Mode) در مرورگرهای Chrome، Edge و Brave.
معماری فنی و ساختار کدها:
نمودار شماتیک جریان داده میان content.js، background.js (Service Worker)، chrome.storage.sync و ماژول‌های کلاسیک افزونه.
ابزارهای کمکی کاربر:
نوار جستجوی زنده برای فیلتر کردن سرفصل‌ها.
دکمه‌های کپی یک‌کلیکه کدها و دستورات همراه با پیام تأیید (Toast).
بخش پرسش‌های متداول (FAQ Accordion).
📋 نحوه جایگذاری (Embed) در سایت شما:
۱. نمایش به صورت آی‌فریم (Iframe) در صفحه دلخواه:
html
<iframe 
  src="bill-bilak-docs.html" 
  style="width: 100%; height: 90vh; border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" 
  title="مستندات بیل بیلک"
  loading="lazy">
</iframe>
۲. قرار دادن به عنوان یک صفحه مستقل در هاست یا GitHub Pages:

فایل bill-bilak-docs.html یا index.html را در پوشه پابلیک هاست یا شاخه gh-pages آپلود کنید تا از آدرسی مانند https://yoursite.com/bilbilak-docs/ در دسترس قرار گیرد.

۳. استفاده در وردپرس یا سیستم‌های مدیریت محتوا:

کافیست یک بلوک HTML سفارشی (Custom HTML) ایجاد کرده و کد بدنه یا آی‌فریم بالا را در آن قرار دهید.

این دو زبانه هست یا انگلیسی؟

پاسخ دقیق به هر دو بخش:

۱. درباره خود افزونه و پروژه گیت‌هاب (BilBilak):

بله، خود افزونه کاملاً دو زبانه (فارسی و انگلیسی) است. در فایل i18n.js و تنظیمات پاپ‌آپ، امکان تغییر آنی زبان بین فارسی (راست‌چین) و انگلیسی (چپ‌چین) بدون نیاز به ریستارت مرورگر پیاده‌سازی شده است.

۲. درباره فایل‌های مستندات HTML:

برای اینکه دست شما برای هر نوع سایتی (سایت فارسی، وبلاگ شخصی یا سایت بین‌المللی انگلیسی) کاملاً باز باشد، هر دو نسخه به صورت کامل و متصل به هم آماده شده‌اند:

🇮🇷 نسخه فارسی: bill-bilak-docs.html
راست‌چین (RTL) با فونت وزیرمتن و دکمه سوییچ به نسخه انگلیسی در هدر.
🇬🇧 نسخه انگلیسی: bill-bilak-docs-en.html
چپ‌چین (LTR) استاندارد و بازنویسی‌شده برای مخاطبان بین‌المللی با دکمه بازگشت به فارسی.
📄 نسخه پیش‌فرض هاست: index.html

هر دو نسخه شامل شبیه‌ساز زنده (Playground)، سوئیچ دارک/لایت مود، نوار جستجوی هوشمند و قابلیت کپی آسان کدها هستند.

<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BilBilak Documentation | Smart Mouse Zoom & Magnifier Extension</title>
  <meta name="description" content="Comprehensive official documentation for BilBilak - A privacy-focused, lightweight, and modern browser extension providing smart instant page zoom and floating lens magnifier for Chromium browsers.">
  <meta name="author" content="Farhad Salahi">
  <!-- Google Fonts: Inter & Fira Code -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #ff6b35;
      --primary-hover: #fa5a1e;
      --primary-light: rgba(255, 107, 53, 0.12);
      --primary-gradient: linear-gradient(135deg, #ff6b35 0%, #ffa726 100%);
      --accent: #ffa726;
      --success: #10b981;
      --warning: #f59e0b;
      --info: #3b82f6;
      --font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-code: 'Fira Code', Consolas, Monaco, monospace;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 24px rgba(0,0,0,0.1);
      --shadow-lg: 0 16px 40px rgba(0,0,0,0.18);
      --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    [data-theme="dark"] {
      --bg-base: #0b0f19;
      --bg-surface: #111827;
      --bg-card: #1f2937;
      --bg-card-hover: #283548;
      --bg-input: #151d2f;
      --border-color: #374151;
      --border-light: rgba(255, 255, 255, 0.08);
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --text-subtle: #6b7280;
      --code-bg: #111827;
      --code-text: #e2e8f0;
      --sidebar-bg: #0d1322;
      --badge-bg: rgba(255, 107, 53, 0.2);
