"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { useSearchStore } from "@/store/search-store"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"

export const SearchInput = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { setSearchTerm, resetSearch } = useSearchStore()

  const debouncedSearch = useDebounce(inputValue)

  useEffect(() => {
    console.log("Debounced search value:", debouncedSearch)
    setSearchTerm(debouncedSearch)
  }, [debouncedSearch, setSearchTerm])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+F or Cmd+F
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault() // Prevent the browser's default find behavior
        setIsExpanded(true)
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!inputValue) {
      setIsExpanded(false)
    }
  }

  const handleClear = () => {
    console.log("Clearing search")
    setInputValue("")
    resetSearch()
    setIsExpanded(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log("Input value changed:", value)
    setInputValue(value)
  }

  return (
    <div className="relative flex items-center">
      <div
        className={cn(
          "flex items-center bg-background border rounded-full overflow-hidden transition-all duration-300",
          isExpanded ? "w-64" : "w-10"
        )}
      >
        <Search
          className="h-4 w-4 mx-3 flex-shrink-0 text-muted-foreground cursor-pointer"
          onClick={() => !isExpanded && inputRef.current?.focus()}
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search episodes... (Ctrl+F)"
          className="flex-1 h-10 bg-transparent outline-none text-sm"
          aria-label="Search episodes"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
