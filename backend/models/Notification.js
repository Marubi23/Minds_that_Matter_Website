const { data, error } = await supabase
  .from('notifications')
  .select('*')
  .eq('role', 'psychiatrist')
  .order('created_at', { ascending: false });

if (error) {
  console.error(error);
} else {
  console.log(data);
}
