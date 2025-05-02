import { allowedMethod, timeNow, getUrl } from './utils'; // Import getUrl
import { serveResult, serveGopayResult } from './helpers';

export default async function checkCache(request: Request): Promise<Response> {
  const now = timeNow();

  // 1. Periksa method request (logic yang sudah ada)
  if (allowedMethod.indexOf(request.method) === -1) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        'Allow': allowedMethod.join(', '),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': allowedMethod.join(', '),
        'Content-Type': 'application/json; charset=utf-8',
        'X-Powered-By': '@ihsangan/valid'
      }
    });
  }

  // 2. Coba ambil dari cache (logic yang sudah ada)
  let cache = caches.default; // Asumsi caches tersedia di lingkungan eksekusi (e.g., Cloudflare Workers)
  let response = await cache.match(request.url);

  // 3. Jika tidak ada di cache, panggil handler yang sesuai
  if (!response) {
    const url = getUrl(request);
    const path = url.pathname;

    // Tentukan handler berdasarkan path
    if (path.includes('/hok')) { // Jika path mengandung '/hok', panggil serveGopayResult
      console.log(`Cache MISS: Handling Gopay request for ${path}`); // Log untuk debugging
      response = await serveGopayResult(request);
    } else { // Untuk path lainnya, panggil serveResult
      console.log(`Cache MISS: Handling standard API request for ${path}`); // Log untuk debugging
      response = await serveResult(request);
    }

    // Simpan response ke cache (logic yang sudah ada)
    // Pastikan response bisa di-cloning dan status/headers dicopy
    // Anda mungkin perlu memeriksa status code sebelum caching jika hanya ingin cache sukses (status 2xx)
    // if (response.status >= 200 && response.status < 300) {
       await cache.put(request.url, response.clone());
    // }
  } else {
     console.log(`Cache HIT for ${request.url}`); // Log untuk debugging cache hit
  }


  // 4. Buat response baru untuk menambahkan header X-Response-Time
  // Menggunakan `new Response(response.body, response)` akan menyalin status dan header
  response = new Response(response.body, response);
  response.headers.set('X-Response-Time', (timeNow() - now).toString()); // Hitung dan set waktu respon

  return response;
}
