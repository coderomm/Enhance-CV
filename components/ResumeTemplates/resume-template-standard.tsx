"use client"

import type React from "react"

import { useSelector, useDispatch } from "react-redux"
import { upsertActiveSection } from "@/lib/features/resume/resumeSlice"
import ResumeHeader from "@/components/resume-header"
import ResumeSection from "@/components/resume-section"
import type { RootState } from "@/lib/store"
import type { Section } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ResumeTemplateStandardProps {
    resumeRef: React.RefObject<HTMLDivElement>
}

export default function ResumeTemplateStandard({ resumeRef }: ResumeTemplateStandardProps) {
    const dispatch = useDispatch()
    const activeSection = useSelector((state: RootState) => state.resume.activeSection)
    const { sections } = useSelector((state: RootState) => state.resume)

    const handleHeaderClick = () => {
        dispatch(upsertActiveSection({ activeSection: null }))
    }

    // Filter sections by column
    const leftSections = sections.filter((section) => section.column === "left")
    const rightSections = sections.filter((section) => section.column === "right")

    return (
        <div className={cn("w-full mx-auto bg-white p-2 md:p-9 min-h-[842px]", activeSection?.id !== null && "resume-editor-overlay-later")} ref={resumeRef}>
            <div onClick={handleHeaderClick}>
                <ResumeHeader isActive={activeSection?.id === null} />
            </div>

            <div className="flex gap-6 mt-6">
                {/* Left Column */}
                <div className="flex-1">
                    {leftSections.map((section: Section) => (
                        <ResumeSection key={section.id} section={section} isActive={section.id === activeSection?.id} />
                    ))}
                </div>

                {/* Right Column */}
                <div className="flex-1">
                    {rightSections.map((section: Section) => (
                        <ResumeSection key={section.id} section={section} isActive={section.id === activeSection?.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
