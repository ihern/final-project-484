export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ffacts: {
        Row: {
          client_id: string
          created_at: string
          email: string
          fact1: string | null
          fact2: string | null
          fact3: string | null
          fact4: string | null
          fact5: string | null
          id: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          email: string
          fact1?: string | null
          fact2?: string | null
          fact3?: string | null
          fact4?: string | null
          fact5?: string | null
          id?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          email?: string
          fact1?: string | null
          fact2?: string | null
          fact3?: string | null
          fact4?: string | null
          fact5?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ffacts_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
