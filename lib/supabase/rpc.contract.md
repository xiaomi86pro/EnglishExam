[
  {
    "schema_name": "public",
    "rpc_name": "gin_extract_query_trgm",
    "return_type": "internal",
    "arguments": "text, internal, smallint, internal, internal, internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gin_extract_value_trgm",
    "return_type": "internal",
    "arguments": "text, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gin_trgm_consistent",
    "return_type": "boolean",
    "arguments": "internal, smallint, text, integer, internal, internal, internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gin_trgm_triconsistent",
    "return_type": "\"char\"",
    "arguments": "internal, smallint, text, integer, internal, internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_compress",
    "return_type": "internal",
    "arguments": "internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_consistent",
    "return_type": "boolean",
    "arguments": "internal, text, smallint, oid, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_decompress",
    "return_type": "internal",
    "arguments": "internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_distance",
    "return_type": "double precision",
    "arguments": "internal, text, smallint, oid, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_in",
    "return_type": "gtrgm",
    "arguments": "cstring",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_options",
    "return_type": "void",
    "arguments": "internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_out",
    "return_type": "cstring",
    "arguments": "gtrgm",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_penalty",
    "return_type": "internal",
    "arguments": "internal, internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_picksplit",
    "return_type": "internal",
    "arguments": "internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_same",
    "return_type": "internal",
    "arguments": "gtrgm, gtrgm, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "gtrgm_union",
    "return_type": "gtrgm",
    "arguments": "internal, internal",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "normalize_answer",
    "return_type": "text",
    "arguments": "p_input text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_add_template_item",
    "return_type": "bigint",
    "arguments": "p_template_section_id bigint, p_category_id bigint, p_question_type_id bigint, p_selection_mode text, p_question_count integer DEFAULT NULL::integer, p_difficulty_min smallint DEFAULT NULL::smallint, p_difficulty_max smallint DEFAULT NULL::smallint, p_avoid_recent_exams integer DEFAULT 0, p_passage_group_id integer DEFAULT NULL::integer, p_passage_count integer DEFAULT NULL::integer, p_passage_type text DEFAULT NULL::text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_add_template_item",
    "return_type": "bigint",
    "arguments": "p_template_section_id bigint, p_category_id bigint, p_question_type_id bigint, p_question_count integer DEFAULT NULL::integer, p_difficulty_min smallint DEFAULT NULL::smallint, p_difficulty_max smallint DEFAULT NULL::smallint, p_avoid_recent_exams integer DEFAULT 0, p_passage_group_id integer DEFAULT NULL::integer, p_passage_count integer DEFAULT NULL::integer, p_passage_type text DEFAULT NULL::text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_add_template_section",
    "return_type": "bigint",
    "arguments": "p_template_id bigint, p_section_id bigint, p_section_order integer",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_admin_hard_delete_exam",
    "return_type": "boolean",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_assert_min_role",
    "return_type": "void",
    "arguments": "p_required_role text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_check_exam_time",
    "return_type": "TABLE(status text, remaining_seconds integer, end_time timestamp with time zone)",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_create_exam_template",
    "return_type": "bigint",
    "arguments": "p_name text, p_grade_level integer, p_duration_minutes integer",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_create_question",
    "return_type": "bigint",
    "arguments": "p_question_type_code text, p_passage_id bigint, p_payload jsonb, p_tag_ids bigint[]",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_delete_student_exam",
    "return_type": "TABLE(success boolean, deleted_exam_id bigint)",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_get_available_exam_templates",
    "return_type": "TABLE(id bigint, name text, duration_minutes integer, grade_level integer, sections integer, total_questions integer, difficulty text, status text, created_at timestamp with time zone)",
    "arguments": "p_grade_level integer",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_get_exam_result",
    "return_type": "jsonb",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_get_exam_structure",
    "return_type": "jsonb",
    "arguments": "p_template_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_get_student_exams",
    "return_type": "TABLE(exam_id bigint, exam_template_id bigint, grade_level integer, score integer, total_questions integer, accuracy numeric, exp_earned integer, created_at timestamp with time zone, submitted_at timestamp with time zone, duration_seconds integer, exam_status text, is_active boolean, total_count bigint)",
    "arguments": "p_user_id uuid, p_limit integer DEFAULT 20, p_offset integer DEFAULT 0",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_list_questions_v2",
    "return_type": "TABLE(question_id bigint, question_text text, difficulty smallint, grade_level integer, category_id bigint, passage_id bigint, passage_title text, question_type_code text, tag_ids bigint[], option_count integer, answer_count integer, is_active boolean, created_at timestamp with time zone, total_count bigint)",
    "arguments": "p_limit integer, p_offset integer, p_search text DEFAULT NULL::text, p_is_active boolean DEFAULT NULL::boolean",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_preview_exam_template",
    "return_type": "TABLE(section_order integer, template_item_id bigint, question_id bigint, question_text text, difficulty integer, passage_id bigint, passage_text text)",
    "arguments": "p_template_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_purge_deleted_exams",
    "return_type": "TABLE(deleted_exams integer)",
    "arguments": "p_limit integer DEFAULT 500",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_question_accuracy",
    "return_type": "TABLE(question_type text, accuracy numeric)",
    "arguments": "p_student_id uuid",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_restore_deleted_exam",
    "return_type": "TABLE(success boolean, restored_exam_id bigint)",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_resume_exam",
    "return_type": "jsonb",
    "arguments": "",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_save_answer",
    "return_type": "void",
    "arguments": "p_exam_id bigint, p_exam_question_id bigint, p_selected_option_id bigint DEFAULT NULL::bigint, p_text_answer text DEFAULT NULL::text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_soft_delete_exam",
    "return_type": "TABLE(success boolean, deleted_exam_id bigint)",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_soft_delete_question",
    "return_type": "void",
    "arguments": "p_question_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_start_exam",
    "return_type": "bigint",
    "arguments": "p_template_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_submit_exam",
    "return_type": "jsonb",
    "arguments": "p_exam_id bigint",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_update_exam_template",
    "return_type": "void",
    "arguments": "p_template_id bigint, p_name text, p_grade_level integer, p_duration_minutes integer",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_update_passage_with_questions",
    "return_type": "bigint",
    "arguments": "p_passage_id bigint, p_title text, p_content text, p_explanation text, p_is_active boolean, p_questions jsonb",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_update_question",
    "return_type": "bigint",
    "arguments": "p_question_id bigint, p_question_text text, p_explanation text, p_difficulty smallint, p_category_id bigint, p_grade_level integer, p_is_active boolean, p_last_updated_at timestamp with time zone, p_options jsonb DEFAULT NULL::jsonb, p_text_answers jsonb DEFAULT NULL::jsonb, p_tag_ids bigint[] DEFAULT NULL::bigint[]",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_update_user_name",
    "return_type": "TABLE(user_id uuid, name text, updated_at timestamp with time zone)",
    "arguments": "p_name text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "rpc_update_user_role",
    "return_type": "TABLE(user_id uuid, role text, updated_at timestamp with time zone)",
    "arguments": "p_user_id uuid, p_new_role text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "set_limit",
    "return_type": "real",
    "arguments": "real",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "show_limit",
    "return_type": "real",
    "arguments": "",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "show_trgm",
    "return_type": "text[]",
    "arguments": "text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "similarity",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "similarity_dist",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "similarity_op",
    "return_type": "boolean",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "strict_word_similarity",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "strict_word_similarity_commutator_op",
    "return_type": "boolean",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "strict_word_similarity_dist_commutator_op",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "strict_word_similarity_dist_op",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "strict_word_similarity_op",
    "return_type": "boolean",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "word_similarity",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "word_similarity_commutator_op",
    "return_type": "boolean",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "word_similarity_dist_commutator_op",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "word_similarity_dist_op",
    "return_type": "real",
    "arguments": "text, text",
    "comment": null
  },
  {
    "schema_name": "public",
    "rpc_name": "word_similarity_op",
    "return_type": "boolean",
    "arguments": "text, text",
    "comment": null
  }
]