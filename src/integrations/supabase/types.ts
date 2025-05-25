export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      meals: {
        Row: {
          created_at: string | null
          cuisine_type: string
          cycle_phase_tags: string[] | null
          description: string
          dietary_tags: string[] | null
          estimated_cost: number | null
          id: string
          image_url: string | null
          ingredients: Json
          nutrition_blurb: string
          symptom_tags: string[] | null
          title: string
        }
        Insert: {
          created_at?: string | null
          cuisine_type: string
          cycle_phase_tags?: string[] | null
          description: string
          dietary_tags?: string[] | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          ingredients: Json
          nutrition_blurb: string
          symptom_tags?: string[] | null
          title: string
        }
        Update: {
          created_at?: string | null
          cuisine_type?: string
          cycle_phase_tags?: string[] | null
          description?: string
          dietary_tags?: string[] | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          ingredients?: Json
          nutrition_blurb?: string
          symptom_tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      shopping_list_items: {
        Row: {
          category: string | null
          created_at: string | null
          estimated_cost: number | null
          id: string
          ingredient_name: string
          is_checked: boolean | null
          meal_id: string | null
          quantity: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          ingredient_name: string
          is_checked?: boolean | null
          meal_id?: string | null
          quantity?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          ingredient_name?: string
          is_checked?: boolean | null
          meal_id?: string | null
          quantity?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_meal_plans: {
        Row: {
          breakfast_id: string | null
          created_at: string | null
          date: string
          dinner_id: string | null
          id: string
          lunch_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          breakfast_id?: string | null
          created_at?: string | null
          date: string
          dinner_id?: string | null
          id?: string
          lunch_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          breakfast_id?: string | null
          created_at?: string | null
          date?: string
          dinner_id?: string | null
          id?: string
          lunch_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_meal_plans_breakfast_id_fkey"
            columns: ["breakfast_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_meal_plans_dinner_id_fkey"
            columns: ["dinner_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_meal_plans_lunch_id_fkey"
            columns: ["lunch_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          budget: string | null
          complexity: string | null
          created_at: string | null
          cuisine_preference: string | null
          cycle_phase: string | null
          dietary_preferences: string[] | null
          id: string
          mood: string | null
          portion_size: string | null
          region: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          budget?: string | null
          complexity?: string | null
          created_at?: string | null
          cuisine_preference?: string | null
          cycle_phase?: string | null
          dietary_preferences?: string[] | null
          id?: string
          mood?: string | null
          portion_size?: string | null
          region?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          budget?: string | null
          complexity?: string | null
          created_at?: string | null
          cuisine_preference?: string | null
          cycle_phase?: string | null
          dietary_preferences?: string[] | null
          id?: string
          mood?: string | null
          portion_size?: string | null
          region?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_or_update_meal_plan: {
        Args: {
          user_id_param: string
          date_param: string
          breakfast_id_param: string
          lunch_id_param: string
          dinner_id_param: string
        }
        Returns: string
      }
      generate_personalized_meal_plan: {
        Args: { user_id_param: string; date_param?: string }
        Returns: {
          meal_id: string
          title: string
          description: string
          nutrition_blurb: string
          image_url: string
          ingredients: Json
          estimated_cost: number
          dietary_tags: string[]
          meal_type: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
