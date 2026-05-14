/* ─── Board & Messages API ─── */

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
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

async function likePost(id, currentLikes) {
  const { error } = await sb
    .from('posts')
    .update({ likes: currentLikes + 1 })
    .eq('id', id);
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
  return data;
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
