export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cultural_profiles: {
        Row: {
          communication_style: string
          country: string
          created_at: string
          cultural_tips: string[] | null
          feedback_style: string | null
          fintech_context: string[] | null
          flag_emoji: string | null
          hierarchy_level: string
          id: string
          meeting_style: string | null
          negotiation_notes: string[] | null
          regulatory_notes: string[] | null
          risk_tolerance: string
          updated_at: string
        }
        Insert: {
          communication_style: string
          country: string
          created_at?: string
          cultural_tips?: string[] | null
          feedback_style?: string | null
          fintech_context?: string[] | null
          flag_emoji?: string | null
          hierarchy_level: string
          id?: string
          meeting_style?: string | null
          negotiation_notes?: string[] | null
          regulatory_notes?: string[] | null
          risk_tolerance: string
          updated_at?: string
        }
        Update: {
          communication_style?: string
          country?: string
          created_at?: string
          cultural_tips?: string[] | null
          feedback_style?: string | null
          fintech_context?: string[] | null
          flag_emoji?: string | null
          hierarchy_level?: string
          id?: string
          meeting_style?: string | null
          negotiation_notes?: string[] | null
          regulatory_notes?: string[] | null
          risk_tolerance?: string
          updated_at?: string
        }
        Relationships: []
      }
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
          home_country: string | null
          id: string
          preferred_financial_system: string | null
          role: string | null
          target_country: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          home_country?: string | null
          id: string
          preferred_financial_system?: string | null
          role?: string | null
          target_country?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          home_country?: string | null
          id?: string
          preferred_financial_system?: string | null
          role?: string | null
          target_country?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          category: string
          context: string | null
          created_at: string
          cultural_tips: string[] | null
          description: string
          difficulty: string
          financial_system: string
          id: string
          regulatory_focus: string[] | null
          source_culture: string
          tags: string[] | null
          target_culture: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          context?: string | null
          created_at?: string
          cultural_tips?: string[] | null
          description: string
          difficulty: string
          financial_system: string
          id?: string
          regulatory_focus?: string[] | null
          source_culture: string
          tags?: string[] | null
          target_culture: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          context?: string | null
          created_at?: string
          cultural_tips?: string[] | null
          description?: string
          difficulty?: string
          financial_system?: string
          id?: string
          regulatory_focus?: string[] | null
          source_culture?: string
          tags?: string[] | null
          target_culture?: string
          title?: string
          updated_at?: string
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
      user_progress: {
        Row: {
          clarity_score: number | null
          compliance_score: number | null
          created_at: string
          cultural_score: number | null
          feedback_summary: Json | null
          id: string
          overall_feedback: string | null
          recording_url: string | null
          scenario_id: string
          specific_tips: string[] | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          clarity_score?: number | null
          compliance_score?: number | null
          created_at?: string
          cultural_score?: number | null
          feedback_summary?: Json | null
          id?: string
          overall_feedback?: string | null
          recording_url?: string | null
          scenario_id: string
          specific_tips?: string[] | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          clarity_score?: number | null
          compliance_score?: number | null
          created_at?: string
          cultural_score?: number | null
          feedback_summary?: Json | null
          id?: string
          overall_feedback?: string | null
          recording_url?: string | null
          scenario_id?: string
          specific_tips?: string[] | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
