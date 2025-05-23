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
      analysis_rules: {
        Row: {
          condicao: Json
          id: number
          mensagem: string
          tipo: string
        }
        Insert: {
          condicao: Json
          id?: number
          mensagem: string
          tipo: string
        }
        Update: {
          condicao?: Json
          id?: number
          mensagem?: string
          tipo?: string
        }
        Relationships: []
      }
      channel_recommendations: {
        Row: {
          canal: string
          condicao: Json
          id: number
        }
        Insert: {
          canal: string
          condicao: Json
          id?: number
        }
        Update: {
          canal?: string
          condicao?: Json
          id?: number
        }
        Relationships: []
      }
      contact_forms: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          interest: string
          message: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          interest: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          interest?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      impact_metrics: {
        Row: {
          conversion_potential: number
          created_at: string
          engagement_score: number
          id: string
          message_id: string
          reach_score: number
          target_demographics: string[] | null
        }
        Insert: {
          conversion_potential: number
          created_at?: string
          engagement_score: number
          id?: string
          message_id: string
          reach_score: number
          target_demographics?: string[] | null
        }
        Update: {
          conversion_potential?: number
          created_at?: string
          engagement_score?: number
          id?: string
          message_id?: string
          reach_score?: number
          target_demographics?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "impact_metrics_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          audience: string[]
          channels: string[]
          content: string
          created_at: string
          id: string
          tema: string
          tone: string
          user_id: string
        }
        Insert: {
          audience: string[]
          channels: string[]
          content: string
          created_at?: string
          id?: string
          tema: string
          tone: string
          user_id: string
        }
        Update: {
          audience?: string[]
          channels?: string[]
          content?: string
          created_at?: string
          id?: string
          tema?: string
          tone?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          canais: string[] | null
          created_at: string
          forcas: string[] | null
          fraquezas: string[] | null
          id: string
          mensagem: string | null
          nome: string
          pontuacao: number
          provincias: string[]
          recursos: Json
          segmentacao: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          canais?: string[] | null
          created_at?: string
          forcas?: string[] | null
          fraquezas?: string[] | null
          id?: string
          mensagem?: string | null
          nome: string
          pontuacao?: number
          provincias: string[]
          recursos: Json
          segmentacao: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          canais?: string[] | null
          created_at?: string
          forcas?: string[] | null
          fraquezas?: string[] | null
          id?: string
          mensagem?: string | null
          nome?: string
          pontuacao?: number
          provincias?: string[]
          recursos?: Json
          segmentacao?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      score_weights: {
        Row: {
          parametro: string
          peso: number
        }
        Insert: {
          parametro: string
          peso: number
        }
        Update: {
          parametro?: string
          peso?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_scenario_score: {
        Args: { recursos: Json; segmentacao: Json; provincias: string[] }
        Returns: number
      }
      generate_recommended_channels: {
        Args: { recursos: Json; segmentacao: Json; provincias: string[] }
        Returns: string[]
      }
      generate_scenario_analysis: {
        Args: {
          recursos: Json
          segmentacao: Json
          provincias: string[]
          pontuacao: number
        }
        Returns: {
          forcas: string[]
          fraquezas: string[]
        }[]
      }
      jsonb_condition_met: {
        Args: { condition: Json; data: Json }
        Returns: boolean
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
