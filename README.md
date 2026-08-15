# 🎵 YouTube Music Pro

เว็บแอพสำหรับฟังเพลงจาก YouTube แบบต่อเนื่องไม่มีสะดุด พร้อมระบบดาวน์โหลด และ PineScript Editor รันบน Render.com ฟรี

---

## ✨ ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| ▶️ **เล่นต่อเนื่อง** | ระบบ Anti-Pause ป้องกัน YouTube ถาม "ยังดูอยู่ไหม" |
| 📋 **Playlist** | สร้าง/จัดการเพลย์ลิสต์หลายรายการ เก็บใน LocalStorage |
| ⬇️ **ดาวน์โหลด** | ดาวน์โหลด MP4/MP3 ผ่าน Backend (เลือกความละเอียดได้) |
| 📊 **PineScript** | Editor + TradingView Widget + บันทึก Script |
| ⏲️ **Sleep Timer** | ตั้งเวลาหยุดเล่นอัตโนมัติ |
| 🎛️ **Speed Control** | ปรับความเร็ว 0.5x - 2x |
| 📺 **Mini Player** | วิดีโอลอยมุมจอ |
| 🌙 **Dark Mode** | ธีมมืดตลอด ประหยัดแบต |
| 📱 **PWA** | ติดตั้งบนมือถือได้ (Add to Home Screen) |

---

## 🚀 วิธีใช้งานทันที (Frontend Only)

1. เปิดไฟล์ `index.html` ใน **Opera Mobile** หรือ Browser อื่น
2. วางลิงก์ YouTube แล้วกด **เพิ่ม**
3. ระบบจะเพิ่มเข้า Playlist และเล่นอัตโนมัติ
4. เปิด **ตั้งค่า (⚙️)** เพื่อเปิด/ปิด Anti-Pause

---

## 🛠️ วิธี Deploy Backend บน Render.com (ฟรี)

### ขั้นตอนที่ 1: สมัคร Render.com
1. ไปที่ [render.com](https://render.com)
2. สมัครด้วย GitHub หรือ Email
3. เลือก **New Web Service**

### ขั้นตอนที่ 2: อัปโหลดโค้ด
**วิธี A: ผ่าน GitHub (แนะนำ)**
```bash
# สร้าง Git Repo ในโฟลเดอร์นี้
git init
git add .
git commit -m "init"
# สร้าง Repo บน GitHub แล้ว push
git remote add origin https://github.com/YOURNAME/youtube-music-pro.git
git push -u origin main
```
จากนั้นใน Render เลือก **Build and deploy from a Git repository**

**วิธี B: อัปโหลดไฟล์ตรง**
- บน Render เลือก **Upload** แล้วอัปโหลดไฟล์ทั้งหมด

### ขั้นตอนที่ 3: ตั้งค่า Render
| ตั้งค่า | ค่า |
|---------|-----|
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### ขั้นตอนที่ 4: แก้ไข Frontend
เปิดไฟล์ `index.html` แล้วแก้ URL Backend:
```javascript
// ค้นหาในส่วน Download แล้วแก้
const BACKEND_URL = 'https://your-app-name.onrender.com';
```

---

## 📁 โครงสร้างไฟล์

```
youtube-music-pro/
├── index.html          # Frontend (SPA)
├── manifest.json       # PWA Manifest
├── server.js           # Backend Express
├── package.json        # Dependencies
└── README.md           # คู่มือนี้
```

---

## 🔌 API Endpoints (Backend)

| Endpoint | Method | คำอธิบาย |
|----------|--------|---------|
| `/health` | GET | เช็คสถานะเซิร์ฟเวอร์ |
| `/api/info?url=...` | GET | ดึงข้อมูลวิดีโอ |
| `/api/download?url=...&quality=720` | GET | ดาวน์โหลด MP4 |
| `/api/download/audio?url=...` | GET | ดาวน์โหลด MP3 |
| `/api/pinescript` | POST/GET | บันทึก/ดึง PineScript |

---

## ⚠️ ข้อควรระวัง

1. **ลิขสิทธิ์**: ใช้ดาวน์โหลดเฉพาะวิดีโอที่คุณเป็นเจ้าของหรือได้รับอนุญาต
2. **Render Free Tier**: จะเข้าสู่ Sleep Mode หลังไม่มีใช้งาน 15 นาที
   - แก้ไข: ใช้ [UptimeRobot](https://uptimerobot.com) Ping ทุก 5 นาที
3. **ytdl-core**: อาจมีปัญหากับวิดีโอบางตัวที่มีการเข้ารหัสพิเศษ

---

## ⌨️ คีย์ลัด

| ปุ่ม | ฟังก์ชั่น |
|------|----------|
| `Space` | Play/Pause |
| `←` | เพลงก่อนหน้า |
| `→` | เพลงถัดไป |

---

## 🔄 อัปเดตในอนาคตที่แนะนำ

- [ ] Sync Playlist ข้ามอุปกรณ์ (ผ่าน Backend + Database)
- [ ] ระบบ Login (Firebase Auth / Clerk)
- [ ] Background Playback (Media Session API)
- [ ] Lyrics API (Musixmatch)
- [ ] รองรับ YouTube Playlist Import

---

สร้างด้วย ❤️ สำหรับ Opera Mobile
