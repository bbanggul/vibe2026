/* ─── Board & Messages API ─── */

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  const tFn = typeof t === 'function' ? t : k => k;
  const lang = typeof window !== 'undefined' ? (window.currentLang || 'ko') : 'ko';
  const sep = (lang === 'ko' || lang === 'ja') ? '' : ' ';
  if (diff < 60) return tFn('timeago_now');
  if (diff < 3600) return `${Math.floor(diff / 60)}${sep}${tFn('timeago_min')}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${sep}${tFn('timeago_hour')}`;
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* Posts */
async function fetchPosts() {
  const { data, error } = await sb
    .from('posts')
    .select('id, title, content, likes, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function fetchPost(id) {
  const { data, error } = await sb
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createPost(title, content) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { data, error } = await sb
    .from('posts')
    .insert({ title, content, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function toggleLikePost(id, currentLikes) {
  const user = await getUser();
  if (!user) throw new Error('login_required');

  const key = `liked_posts_${user.id}`;
  const liked = JSON.parse(localStorage.getItem(key) || '[]');
  const alreadyLiked = liked.includes(String(id));

  const newLikes = alreadyLiked ? currentLikes - 1 : currentLikes + 1;
  const { error } = await sb
    .from('posts')
    .update({ likes: newLikes })
    .eq('id', id);
  if (error) throw error;

  if (alreadyLiked) {
    localStorage.setItem(key, JSON.stringify(liked.filter(x => x !== String(id))));
  } else {
    liked.push(String(id));
    localStorage.setItem(key, JSON.stringify(liked));
  }
  return { likes: newLikes, liked: !alreadyLiked };
}

async function hasLikedPost(id) {
  const user = await getUser();
  if (!user) return false;
  const key = `liked_posts_${user.id}`;
  const liked = JSON.parse(localStorage.getItem(key) || '[]');
  return liked.includes(String(id));
}

async function updatePost(id, title, content) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { error } = await sb
    .from('posts')
    .update({ title, content })
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw error;
}

async function deletePost(id) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { error } = await sb
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) throw error;
}

/* Comments */
async function fetchComments(postId) {
  const { data, error } = await sb
    .from('comments')
    .select('id, content, created_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

async function createComment(postId, content) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { error } = await sb
    .from('comments')
    .insert({ post_id: postId, content, user_id: user.id });
  if (error) throw error;
}

/* Messages */
async function fetchMessages() {
  const user = await getUser();
  if (!user) return [];
  const { data, error } = await sb
    .from('messages')
    .select('*')
    .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.filter(m =>
    m.sender_id === user.id ? !m.deleted_by_sender : !m.deleted_by_receiver
  );
}

async function sendMessage(receiverId, postId, content) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { error } = await sb
    .from('messages')
    .insert({ sender_id: user.id, receiver_id: receiverId, post_id: postId, content });
  if (error) throw error;
}

async function replyMessage(originalMsg, content) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const receiverId = originalMsg.sender_id === user.id
    ? originalMsg.receiver_id
    : originalMsg.sender_id;
  const { error } = await sb
    .from('messages')
    .insert({ sender_id: user.id, receiver_id: receiverId, post_id: originalMsg.post_id, content });
  if (error) throw error;
}

async function markRead(id) {
  await sb.from('messages').update({ is_read: true }).eq('id', id);
}

async function deleteMessage(id) {
  const user = await getUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  const { data: msg } = await sb.from('messages').select('sender_id').eq('id', id).single();
  const isSender = msg?.sender_id === user.id;
  const { error } = await sb
    .from('messages')
    .update(isSender ? { deleted_by_sender: true } : { deleted_by_receiver: true })
    .eq('id', id);
  if (error) throw error;
}
