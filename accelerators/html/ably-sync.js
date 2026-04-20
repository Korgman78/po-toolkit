// ably-sync.js — Lightweight real-time sync for PO Toolkit mini-apps
// Requires: ably-config.js (sets window.ABLY_TOKEN) + Ably SDK from CDN
(function () {
  let ably = null;
  let channel = null;
  let clientId = 'u-' + Math.random().toString(36).slice(2, 10);
  let onReceive = null;
  let connected = false;

  function init() {
    if (ably) return;
    if (!window.ABLY_TOKEN) return;
    try {
      ably = new Ably.Realtime({
        token: window.ABLY_TOKEN,
        clientId: clientId,
        recover: (_, cb) => cb(true)
      });
      ably.connection.on('connected', () => { connected = true; });
      ably.connection.on('disconnected', () => { connected = false; });
      ably.connection.on('failed', () => { connected = false; });
    } catch (e) {
      console.warn('Ably init failed', e);
    }
  }

  function join(channelName, callback) {
    init();
    if (!ably) return;
    onReceive = callback;
    if (channel) {
      channel.unsubscribe();
      channel.detach();
    }
    channel = ably.channels.get(channelName);
    channel.subscribe('sync', (msg) => {
      if (!msg.data || msg.data._cid === clientId) return;
      if (onReceive) onReceive(msg.data);
    });
  }

  function broadcast(data) {
    if (!channel || !connected) return;
    channel.publish('sync', { ...data, _cid: clientId });
  }

  function isConnected() { return connected; }
  function getClientId() { return clientId; }

  window.ablySync = { join, broadcast, isConnected, getClientId };
})();
