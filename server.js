const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health check (สำคัญสำหรับ Render.com)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: ดึงข้อมูลวิดีโอ (info)
app.get('/api/info', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }
        const info = await ytdl.getInfo(url);
        const formats = info.formats
            .filter(f => f.hasVideo && f.hasAudio)
            .map(f => ({
                quality: f.qualityLabel,
                qualityLabel: f.qualityLabel,
                itag: f.itag,
                container: f.container
            }))
            .filter((v, i, a) => a.findIndex(t => t.quality === v.quality) === i)
            .sort((a, b) => parseInt(b.quality) - parseInt(a.quality));

        res.json({
            title: info.videoDetails.title,
            author: info.videoDetails.author.name,
            lengthSeconds: info.videoDetails.lengthSeconds,
            thumbnail: info.videoDetails.thumbnails.pop().url,
            formats: formats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// API: สตรีม/ดาวน์โหลดวิดีโอ
app.get('/api/download', async (req, res) => {
    try {
        const { url, quality } = req.query;
        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const info = await ytdl.getInfo(url);
        let format = ytdl.chooseFormat(info.formats, {
            quality: quality || 'highest',
            filter: 'audioandvideo'
        });

        // ถ้าขอความละเอียดเฉพาะ
        if (quality && quality !== 'highest') {
            const target = info.formats.find(f => 
                f.hasVideo && f.hasAudio && f.qualityLabel && f.qualityLabel.includes(quality)
            );
            if (target) format = target;
        }

        const title = info.videoDetails.title.replace(/[^a-zA-Z0-9\u0E00-\u0E7F\s]/g, '_');
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        res.header('Content-Type', 'video/mp4');

        ytdl(url, { format: format }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// API: ดาวน์โหลดเฉพาะเสียง MP3
app.get('/api/download/audio', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url || !ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-zA-Z0-9\u0E00-\u0E7F\s]/g, '_');

        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        res.header('Content-Type', 'audio/mpeg');

        ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// PineScript Storage API (ถ้าต้องการ sync ข้ามเครื่อง)
const pinescripts = [];
app.post('/api/pinescript', (req, res) => {
    const { name, code } = req.body;
    if (!name || !code) return res.status(400).json({ error: 'Missing fields' });
    const ps = { id: Date.now(), name, code, createdAt: new Date() };
    pinescripts.push(ps);
    res.json(ps);
});
app.get('/api/pinescript', (req, res) => {
    res.json(pinescripts);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
