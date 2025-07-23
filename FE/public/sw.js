// self.addEventListener('push', function(event) {

//   const data = event.data ? event.data.json() : {};
//   const title = data.title || 'New Message';
//   const options = {
//     body: data.body || '메시지가 도착했습니다!',
//     icon: '/logo.png'
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(clients.matchAll({ type: 'window' }).then(function(clientList) {
//     if (clientList.length > 0) {
//       return clientList[0].focus();
//     }
//     return clients.openWindow('/');
//   }));
// });

self.addEventListener("push", function (event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "New Message";
  const options = {
    body: data.body || '메시지가 도착했습니다!',
    icon: '/logo.png',
    data: { url: data.url }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      const url = event.notification.data && event.notification.data.url; // payload에서 url 가져옴
      if (clientList.length > 0) {
        return clientList[0].navigate(url).then(client => client.focus());
      }
      return clients.openWindow(url || '/');
    })
  );
});
