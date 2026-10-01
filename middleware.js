// Vercel Routing Middleware : redirige immédiatement vers le bon store selon l'appareil.
// Les ordinateurs (et appareils non reconnus) continuent vers index.html.

const APP_STORE = 'https://apps.apple.com/fr/app/mypcs/id1507144448';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.pcs.mypcs&hl=fr';

export const config = {
  // Toutes les routes sauf les fichiers statiques (favicon, images...)
  matcher: '/((?!.*\\.).*)',
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  if (/android/i.test(ua)) {
    return redirect(PLAY_STORE);
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    return redirect(APP_STORE);
  }
  // Sinon : on laisse passer vers la page de secours (index.html)
}

function redirect(url) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      'Cache-Control': 'no-store',
      Vary: 'User-Agent',
    },
  });
}
