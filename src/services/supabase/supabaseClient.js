import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchAllRecords = async (table) => {
    const { data, error } = await supabase
    .from(table)
    .select("id, title")
    .order('id', { ascending: true });

    if (error) {
        throw error;
    }
    return data;
}

export const insertRecord = async (title, table) => {
    const { data, error } = await supabase
    .from(table)
    .insert([
        { title: title, content: "No available content... yet" },
    ])
    .select("id, title");

    if (error) {
        throw error;
    }
    return data;
};

export const deleteRecordById = async (id, table) => {
    const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

    if (error) {
        throw error;
    }
};
