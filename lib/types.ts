export interface Header {
  name: string
  title: string
  phone: string
  email: string
  link: string
  extraLink: string
  location: string
  extraField: string
  photoUrl: string
  visibility: HeaderVisibility
  uppercaseName: boolean
  roundPhoto: boolean
}

export interface HeaderVisibility {
  title: boolean
  phone: boolean
  email: boolean
  link: boolean
  extraLink: boolean
  location: boolean
  photo: boolean
  extraField: boolean
}

export interface EducationSectionItem {
  id: string
  degree: string
  school: string
  gpa: string
  location: string
  period: string
  bullets: string[]
  logo: string
  visibility?: EducationContentVisibility
}

export interface EducationContentVisibility {
  gpa: boolean
  location: boolean
  period: boolean
  bullets: boolean
  logo: boolean
}

export const EducationFields: { key: keyof EducationContentVisibility; label: string }[] = [
  { key: "bullets", label: "Show Bullets" },
  { key: "location", label: "Show Location" },
  { key: "period", label: "Show Period" },
  { key: "logo", label: "Show Company Logo" },
  { key: "gpa", label: "Show GPA" },
];

export interface ProjectSectionItem {
  id: string
  projectName: string
  description: string
  bullets: string[]
  location: string
  period: string
  link: string
  visibility?: ProjectContentVisibility
}

export interface ProjectContentVisibility {
  description: boolean
  bullets: boolean
  location: boolean
  period: boolean
  link: boolean
}

export interface LanguageSectionItem {
  id: string
  name: string
  level: string
  proficiency: number // 1-5
  visibility?: LanguageContentVisibility
}

export interface LanguageContentVisibility {
  proficiency: boolean
  slider: boolean
}

export interface SkillSectionItem {
  id: string
  groupName?: string
  skills: string[]
  visibility?: SkillVisibility
}

export interface SkillVisibility {
  groupName: boolean
  compactMode: boolean
}

export interface AchievementSectionItem {
  id: string
  title: string
  description: string
  icon: string // e.g., "info", "award", etc.
  visibility?: AchievementContentVisibility
}

export interface AchievementContentVisibility {
  description: boolean
  icon: boolean
}

export enum SectionTypeEnum {
  EDUCATION = "educations",
  PROJECTS = "projects",
  SKILLS = "skills",
  LANGUAGES = "languages",
  ACHIEVEMENTS = "achievements"
}

export const proficiencyLabels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficient", "Native"]

export type SectionType = SectionTypeEnum.EDUCATION | SectionTypeEnum.PROJECTS | SectionTypeEnum.LANGUAGES | SectionTypeEnum.SKILLS | SectionTypeEnum.ACHIEVEMENTS

export type SectionContent = EducationSectionItem | ProjectSectionItem | LanguageSectionItem | SkillSectionItem | AchievementSectionItem

export interface ActiveSection {
  id: string;
  type: SectionType
  column: "left" | "right"
  title: string
  entryId: string | null
}

export interface SectionProps {
  section: Section
  isActive: boolean
  darkMode?: boolean
  handleEntryToggle: (e: React.MouseEvent, entryId: string) => void
  handleContextMenu: (e: React.MouseEvent, entryId?: string, groupId?: string) => void
}

export interface Section {
  id: string;
  type: SectionType
  column: "left" | "right"
  title: string
  content: {
    educations?: EducationSectionItem[];
    projects?: ProjectSectionItem[];
    languages?: LanguageSectionItem[];
    skills?: SkillSectionItem[];
    achievements?: AchievementSectionItem[]
  }
}

export type SectionContentMap = {
  educations: EducationSectionItem[];
  projects: ProjectSectionItem[];
  skills: SkillSectionItem[];
  languages: LanguageSectionItem[];
  achievements: AchievementSectionItem[]
};

export type VisibilityActionPayload = {
  sectionId: string
  entryId: string
  field: any
  value: boolean
}

export type VisibilityDispatchMap = {
  [SectionTypeEnum.EDUCATION]: (payload: {
    sectionId: string
    entryId: string
    field: keyof EducationContentVisibility
    value: boolean
  }) => any
  [SectionTypeEnum.PROJECTS]: (payload: {
    sectionId: string
    entryId: string
    field: keyof ProjectContentVisibility
    value: boolean
  }) => any
  [SectionTypeEnum.LANGUAGES]: (payload: {
    sectionId: string
    entryId: string
    field: keyof LanguageContentVisibility
    value: boolean
  }) => any
  [SectionTypeEnum.SKILLS]: (payload: {
    sectionId: string
    entryId: string
    field: keyof SkillVisibility
    value: boolean
  }) => any
  [SectionTypeEnum.ACHIEVEMENTS]: (payload: {
    sectionId: string
    entryId: string
    field: keyof AchievementContentVisibility
    value: boolean
  }) => any
}

export type ActiveSkillData = {
  sectionId: string;
  groupId: string;
  skillIndex: number;
} | null;

export interface ResumeState {
  header: Header
  sections: Section[]
  activeSection: ActiveSection | null
  activeSkillData: ActiveSkillData
  history: {
    past: Array<{
      header: Header
      sections: Section[]
    }>
    future: Array<{
      header: Header
      sections: Section[]
    }>
  }
}

export interface SettingsState {
  branding: boolean
  theme: "light" | "dark"
  fontSize: number
  fontFamily: string
  template: string
  showTemplatesModal: boolean
  showAddSectionModal: boolean
  addSectionColumn: "left" | "right"
}

export interface RootState {
  resume: ResumeState
  settings: SettingsState
}
