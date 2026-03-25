-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.exam_options (
  id bigint NOT NULL DEFAULT nextval('exam_options_id_seq'::regclass),
  exam_question_id bigint NOT NULL,
  option_order smallint NOT NULL,
  option_label character NOT NULL CHECK (option_label = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar])),
  option_text text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  original_option_id bigint,
  CONSTRAINT exam_options_pkey PRIMARY KEY (id),
  CONSTRAINT exam_options_exam_question_fk FOREIGN KEY (exam_question_id) REFERENCES public.exam_questions(id)
);
CREATE TABLE public.exam_passages (
  id bigint NOT NULL DEFAULT nextval('exam_passages_id_seq'::regclass),
  exam_id bigint NOT NULL,
  original_passage_id bigint,
  title_snapshot character varying,
  content_snapshot text NOT NULL,
  passage_type_snapshot character varying NOT NULL,
  audio_url_snapshot text,
  passage_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exam_passages_pkey PRIMARY KEY (id),
  CONSTRAINT exam_passages_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);
CREATE TABLE public.exam_question_options (
  id bigint NOT NULL DEFAULT nextval('exam_question_options_id_seq'::regclass),
  exam_question_id bigint NOT NULL,
  option_label_snapshot character NOT NULL CHECK (option_label_snapshot = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar])),
  option_text_snapshot text NOT NULL,
  is_correct_snapshot boolean NOT NULL,
  option_order integer NOT NULL,
  CONSTRAINT exam_question_options_pkey PRIMARY KEY (id),
  CONSTRAINT exam_question_options_exam_question_id_fkey FOREIGN KEY (exam_question_id) REFERENCES public.exam_questions(id)
);
CREATE TABLE public.exam_questions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  exam_id bigint NOT NULL,
  question_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  original_question_id bigint,
  exam_passage_id bigint,
  question_text_snapshot text,
  explanation_snapshot text,
  question_type_snapshot bigint,
  difficulty_snapshot smallint,
  answer_key_snapshot text,
  CONSTRAINT exam_questions_pkey PRIMARY KEY (id),
  CONSTRAINT exam_questions_exam_passage_id_fkey FOREIGN KEY (exam_passage_id) REFERENCES public.exam_passages(id),
  CONSTRAINT exam_questions_exam_fk FOREIGN KEY (exam_id) REFERENCES public.exams(id),
  CONSTRAINT exam_questions_original_question_fk FOREIGN KEY (original_question_id) REFERENCES public.questions(id)
);
CREATE TABLE public.exam_template_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  template_section_id bigint NOT NULL,
  category_id bigint NOT NULL,
  question_type_id bigint NOT NULL,
  question_count integer NOT NULL CHECK (question_count > 0),
  difficulty_min smallint,
  difficulty_max smallint,
  avoid_recent_exams integer DEFAULT 0,
  passage_group_id integer,
  passage_count integer,
  passage_type text CHECK (passage_type = ANY (ARRAY['reading'::text, 'listening'::text])),
  selection_mode text NOT NULL CHECK (selection_mode = ANY (ARRAY['QUESTION'::text, 'PASSAGE'::text])),
  CONSTRAINT exam_template_items_pkey PRIMARY KEY (id),
  CONSTRAINT exam_template_items_template_section_id_fkey FOREIGN KEY (template_section_id) REFERENCES public.exam_template_sections(id),
  CONSTRAINT exam_template_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.question_categories(id),
  CONSTRAINT exam_template_items_question_type_id_fkey FOREIGN KEY (question_type_id) REFERENCES public.question_types(id)
);
CREATE TABLE public.exam_template_sections (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  exam_template_id bigint NOT NULL,
  section_id bigint NOT NULL,
  section_order integer NOT NULL,
  CONSTRAINT exam_template_sections_pkey PRIMARY KEY (id),
  CONSTRAINT exam_template_sections_exam_template_id_fkey FOREIGN KEY (exam_template_id) REFERENCES public.exam_templates(id),
  CONSTRAINT exam_template_sections_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id)
);
CREATE TABLE public.exam_templates (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  grade_level integer NOT NULL CHECK (grade_level >= 6 AND grade_level <= 12),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  duration_minutes integer NOT NULL DEFAULT 60 CHECK (duration_minutes >= 5 AND duration_minutes <= 150),
  CONSTRAINT exam_templates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.exams (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  grade_level integer NOT NULL CHECK (grade_level > 0),
  created_at timestamp with time zone DEFAULT now(),
  submitted_at timestamp with time zone CHECK (submitted_at IS NULL OR submitted_at <= now()),
  score integer DEFAULT 0,
  total_questions integer NOT NULL,
  exam_template_id bigint NOT NULL,
  exp_earned integer DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  deleted_at timestamp with time zone,
  duration_minutes integer NOT NULL,
  CONSTRAINT exams_pkey PRIMARY KEY (id),
  CONSTRAINT exams_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT exams_exam_template_id_fkey FOREIGN KEY (exam_template_id) REFERENCES public.exam_templates(id),
  CONSTRAINT exams_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.options (
  id bigint NOT NULL DEFAULT nextval('options_id_seq'::regclass),
  question_id bigint NOT NULL,
  option_label character NOT NULL CHECK (option_label = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar])),
  option_text text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  CONSTRAINT options_pkey PRIMARY KEY (id),
  CONSTRAINT options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id)
);
CREATE TABLE public.passages (
  id bigint NOT NULL DEFAULT nextval('passages_id_seq'::regclass),
  title character varying,
  content text NOT NULL,
  audio_url text,
  created_at timestamp with time zone DEFAULT now(),
  grade_level integer NOT NULL CHECK (grade_level >= 6 AND grade_level <= 12),
  is_active boolean NOT NULL DEFAULT true,
  deleted_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid,
  updated_by uuid,
  CONSTRAINT passages_pkey PRIMARY KEY (id),
  CONSTRAINT passages_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT passages_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  exp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100),
  role text NOT NULL DEFAULT 'student'::user_role CHECK (role = ANY (ARRAY['student'::text, 'teacher'::text, 'admin'::text])),
  total_score numeric DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  deleted_at timestamp with time zone,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.question_audits (
  id bigint NOT NULL DEFAULT nextval('question_audits_id_seq'::regclass),
  question_id bigint NOT NULL,
  old_data jsonb NOT NULL,
  new_data jsonb NOT NULL,
  changed_by uuid,
  changed_at timestamp with time zone DEFAULT now(),
  action_type text,
  CONSTRAINT question_audits_pkey PRIMARY KEY (id)
);
CREATE TABLE public.question_categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  section_id bigint NOT NULL,
  display_order integer DEFAULT 1,
  default_question_type_id bigint,
  CONSTRAINT question_categories_pkey PRIMARY KEY (id),
  CONSTRAINT question_categories_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id),
  CONSTRAINT question_categories_default_type_id_fkey FOREIGN KEY (default_question_type_id) REFERENCES public.question_types(id)
);
CREATE TABLE public.question_tags (
  question_id bigint NOT NULL,
  tag_id bigint NOT NULL,
  CONSTRAINT question_tags_pkey PRIMARY KEY (question_id, tag_id),
  CONSTRAINT question_tags_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id),
  CONSTRAINT question_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)
);
CREATE TABLE public.question_text_answers (
  id bigint NOT NULL DEFAULT nextval('question_text_answers_id_seq'::regclass),
  question_id bigint NOT NULL,
  accepted_answer text NOT NULL,
  normalized_answer text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT question_text_answers_pkey PRIMARY KEY (id),
  CONSTRAINT question_text_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id)
);
CREATE TABLE public.question_types (
  id bigint NOT NULL DEFAULT nextval('question_types_id_seq'::regclass),
  code character varying NOT NULL UNIQUE,
  name character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT question_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.questions (
  id bigint NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
  question_type_id bigint NOT NULL,
  passage_id bigint,
  question_text text NOT NULL,
  grade_level integer NOT NULL CHECK (grade_level >= 6 AND grade_level <= 12),
  explanation text,
  created_at timestamp with time zone DEFAULT now(),
  difficulty smallint NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
  is_active boolean NOT NULL DEFAULT true,
  category_id bigint NOT NULL,
  order_in_category integer,
  updated_at timestamp with time zone DEFAULT now(),
  blank_index integer,
  deleted_at timestamp with time zone,
  created_by uuid,
  updated_by uuid,
  CONSTRAINT questions_pkey PRIMARY KEY (id),
  CONSTRAINT questions_question_type_id_fkey FOREIGN KEY (question_type_id) REFERENCES public.question_types(id),
  CONSTRAINT questions_passage_id_fkey FOREIGN KEY (passage_id) REFERENCES public.passages(id),
  CONSTRAINT questions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.question_categories(id)
);
CREATE TABLE public.rpc_registry (
  rpc_name text NOT NULL,
  module text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'PENDING'::text CHECK (status = ANY (ARRAY['PENDING'::text, 'IN_PROGRESS'::text, 'DONE'::text])),
  audited_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT rpc_registry_pkey PRIMARY KEY (rpc_name)
);
CREATE TABLE public.sections (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  CONSTRAINT sections_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tags (
  id bigint NOT NULL DEFAULT nextval('tags_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_answers (
  id bigint NOT NULL DEFAULT nextval('user_answers_id_seq'::regclass),
  exam_id bigint NOT NULL,
  exam_question_id bigint NOT NULL,
  selected_option_label text,
  answer_text text CHECK (answer_text IS NULL OR length(TRIM(BOTH FROM answer_text)) > 0),
  is_correct boolean,
  answered_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  exam_question_option_id bigint,
  CONSTRAINT user_answers_pkey PRIMARY KEY (id),
  CONSTRAINT user_answers_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id),
  CONSTRAINT user_answers_exam_question_id_fkey FOREIGN KEY (exam_question_id) REFERENCES public.exam_questions(id),
  CONSTRAINT user_answers_user_fk FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT user_answers_exam_option_fk FOREIGN KEY (exam_question_option_id) REFERENCES public.exam_question_options(id)
);