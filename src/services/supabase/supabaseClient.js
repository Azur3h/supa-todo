import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const deleteRecordById = async (id, table) => {
    const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

    if (error) {
        console.error("Error fetching data: ", error);
        return false;
    };
    return true;
};