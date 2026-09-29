# ACT Supervision Dashboard

ระบบนิเทศการสอนวิชาพลศึกษา (teacher supervision dashboard) สำหรับ ACT Sport Center — Assumption College Thonburi

## โครงสร้างไฟล์

- `index.html` — หน้าแดชบอร์ดหลัก แสดงสรุปผลการนิเทศ (ดึงข้อมูลจาก Google Sheets ผ่าน gviz CSV export)
- `form.js` — ฟอร์มบันทึกข้อมูลการนิเทศ ส่งข้อมูลไปยัง Google Apps Script Web App (`doPost`) ที่ผูกกับ Google Sheet
- `favicon.png`, `apple-touch-icon.png` — ไอคอนเว็บไซต์

## Data source

Google Sheet (ID ใน `index.html`, ตัวแปร `SHEET_ID`) — sheet "Data" (บันทึกการนิเทศ) และ "Criteria" (เกณฑ์คะแนน)

## Deploy

Deploy อยู่บน Vercel: https://act-supervision-dashboard.vercel.app/

โทนสี: แดง (accent) + ดำ/เทา/ขาว (neutral) — ออกแบบให้สบายตา ใช้สีแดงเฉพาะจุดสำคัญ (ปุ่มหลัก, ตัวเลขเด่น, คำเตือน)
