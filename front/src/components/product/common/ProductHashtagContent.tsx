import { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover"

type HashtagContentProps = {
  hashtags: { value: string; label: string }[]; // 프레임워크 리스트
  value: string; // 현재 선택된 프레임워크 값
  setValue: (value: string) => void; // 선택 값 변경 함수
  className?: string; // 클래스 이름

  handleHashTagChange: (tag: string) => void;
};

function HashtagContent({
  hashtags,
  value,
  setValue,
  className,
  handleHashTagChange,
}: HashtagContentProps) {
  const [open, setOpen] = useState(false)

  // 해시태그 입력 이후 엔터 키 입력시에 태그 추가
  const handleAddEnterHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleHashTagChange(e.currentTarget.value)
      setOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? hashtags.find((hashtags) => hashtags.value === value)?.label
                : "Select hashtag..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={`popover-content-width-full ${className}`}>
            <Command>
              <CommandInput 
                placeholder="Search hashtags..." 
                className="h-9"
                onKeyDown={handleAddEnterHashTag}
              />
              <CommandList>
                <CommandEmpty>No hashtag found.</CommandEmpty>
                <CommandGroup>
                  {hashtags.map((hashtags) => (
                    <CommandItem
                      key={hashtags.value}
                      value={hashtags.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        handleHashTagChange(currentValue)
                      }}
                    >
                      {hashtags.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === hashtags.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default HashtagContent;