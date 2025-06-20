"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import {
    addEntryLanguage,
    updateEntryLanguage,
    removeEntryLanguage,
    toggleEntryVisibility_Language
} from "@/lib/features/resume/resumeSlice"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Settings, MoveVertical } from "lucide-react"
import EditableText from "@/components/Shared/editable-text"
import { cn } from "@/lib/utils"
import LanguageSettingsPanel from "@/components/Sections/Language/SettingsPannel/language-settings-panel"
import type { LanguageSectionItem, Section } from "@/lib/types"

interface SectionProps {
    section: Section
    isActive: boolean
    darkMode?: boolean
}

const proficiencyLabels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficient", "Native"]

export default function LanguageSection({ section, isActive, darkMode = false }: SectionProps) {
    const dispatch = useDispatch()
    const [showSettings, setShowSettings] = useState(false)
    const [activeLanguageId, setActiveLanguageId] = useState<string | null>(null)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const settingsRef = useRef<HTMLDivElement>(null)

    const handleupdateEntryLanguage = (langId: string, field: string, value: string | number) => {
        dispatch(
            updateEntryLanguage({
                sectionId: section.id,
                langId,
                field,
                value,
            }),
        )

        // Update proficiency level text based on rating
        if (field === "proficiency") {
            const proficiencyIndex = Math.min(Math.max(1, Number(value)), 5) - 1
            dispatch(
                updateEntryLanguage({
                    sectionId: section.id,
                    langId,
                    field: "level",
                    value: proficiencyLabels[proficiencyIndex],
                }),
            )
        }
    }

    const handleremoveEntryLanguage = (langId: string) => {
        dispatch(
            removeEntryLanguage({
                sectionId: section.id,
                langId,
            }),
        )
    }

    const handleSettingsClick = (e: React.MouseEvent, langId: string) => {
        e.stopPropagation()
        setActiveLanguageId(langId)
        setMenuPosition({ x: e.clientX, y: e.clientY })
        setShowSettings(true)
    }

    const handleToggleVisibility = (field: string, value: boolean) => {
        if (activeLanguageId) {
            dispatch(
                toggleEntryVisibility_Language({
                    sectionId: section.id,
                    entryId: activeLanguageId,
                    field,
                    value,
                }),
            )
        }
    }

    return (
        <div className="space-y-4">
            {section.content.languages?.map((language: LanguageSectionItem) => (
                <div
                    key={language.id}
                    className={cn(
                        "relative p-3 -mx-3 group/entry border border-transparent",
                        isActive && "hover:bg-gray-50 hover:border-gray-200 rounded-md",
                    )}
                >
                    {isActive && (
                        <div className="absolute right-2 top-2 opacity-0 group-hover/entry:opacity-100 transition-opacity flex space-x-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 bg-white border shadow-sm"
                                onClick={(e) => handleSettingsClick(e, language.id)}
                            >
                                <Settings size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 bg-white border shadow-sm cursor-move">
                                <MoveVertical size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 bg-white border shadow-sm text-gray-400 hover:text-red-500"
                                onClick={() => handleremoveEntryLanguage(language.id)}
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    )}

                    <div className="font-medium">
                        <EditableText
                            value={language.name}
                            onChange={(value) => handleupdateEntryLanguage(language.id, "name", value)}
                            className="font-medium"
                        />
                    </div>

                    {language.visibility?.proficiency !== false && (
                        <div className="text-gray-500 text-sm">
                            <EditableText
                                value={language.level}
                                onChange={(value) => handleupdateEntryLanguage(language.id, "level", value)}
                                className="text-sm"
                            />
                        </div>
                    )}

                    {language.visibility?.slider !== false && (
                        <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <div
                                    key={rating}
                                    className={cn(
                                        "w-5 h-5 rounded-full mx-0.5 cursor-pointer",
                                        rating <= language.proficiency ? "bg-teal-500" : "bg-gray-200",
                                    )}
                                    onClick={() => handleupdateEntryLanguage(language.id, "proficiency", rating)}
                                ></div>
                            ))}
                        </div>
                    )}
                </div>
            ))}           

            {showSettings && activeLanguageId && (
                <div
                    ref={settingsRef}
                    className="fixed z-50"
                    style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
                >
                    <LanguageSettingsPanel
                        language={section.content.languages?.find((lang) => lang.id === activeLanguageId) || null}
                        onToggleVisibility={handleToggleVisibility}
                        onClose={() => setShowSettings(false)}
                    />
                </div>
            )}
        </div>
    )
}
