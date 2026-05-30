import { create } from "zustand";

type LessonState = {
  currentCourseId: string | null;
  currentLessonId: string | null;
  setCurrentCourse: (course: string) => void;
  setCurrentLesson: (lesson: string) => void;
};

export const useLessonStore = create<LessonState>((set) => ({
  currentCourseId: null,
  currentLessonId: null,
  setCurrentCourse: (course) => set({ currentCourseId: course }),
  setCurrentLesson: (lesson) => set({ currentLessonId: lesson }),
}));
