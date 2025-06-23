import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'text/plain');
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
}
