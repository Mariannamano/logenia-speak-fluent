
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type GuideCharacter = "owl" | "cat" | "fox";

interface CharacterGuideProps {
  character?: GuideCharacter;
  onCharacterChange?: (character: GuideCharacter) => void;
  tip?: string;
  encouragement?: string;
  visible?: boolean;
}

const CharacterGuide = ({
  character = "owl",
  onCharacterChange,
  tip = "Try speaking slowly and clearly to improve your pronunciation.",
  encouragement = "You're making great progress! Keep practicing!",
  visible = true,
}: CharacterGuideProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!visible) return null;

  const getCharacterEmoji = (char: GuideCharacter) => {
    switch (char) {
      case "owl":
        return "🦉";
      case "cat":
        return "🐱";
      case "fox":
        return "🦊";
      default:
        return "🦉";
    }
  };

  const getCharacterName = (char: GuideCharacter) => {
    switch (char) {
      case "owl":
        return "Professor Hoot";
      case "cat":
        return "Linguist Whiskers";
      case "fox":
        return "Polyglot Rusty";
      default:
        return "Professor Hoot";
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border shadow-sm bg-background"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getCharacterEmoji(character)}</span>
          <span className="font-medium">{getCharacterName(character)}</span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? "Minimize" : "Expand"}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <CardContent className="pt-4">
          <div className="mb-4 text-center">
            <span className="text-5xl block mb-2 animate-float">
              {getCharacterEmoji(character)}
            </span>
          </div>

          <div className="space-y-4">
            {tip && (
              <Card className="bg-fluent-50 dark:bg-fluent-900/20 border-fluent-100">
                <CardContent className="py-3">
                  <div className="flex gap-2 items-start">
                    <div className="bg-fluent-200 p-1 rounded-full mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-fluent-700"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div className="text-sm">{tip}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {encouragement && (
              <Card className="bg-fluent-accent2/30 dark:bg-fluent-accent2/10 border-fluent-accent2/50">
                <CardContent className="py-3">
                  <div className="flex gap-2 items-start">
                    <div className="bg-fluent-accent2/50 p-1 rounded-full mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-fluent-900"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <div className="text-sm">{encouragement}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {onCharacterChange && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">Change your guide:</p>
                <div className="flex gap-2">
                  <Button
                    variant={character === "owl" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCharacterChange("owl")}
                    className={character === "owl" ? "bg-fluent-primary text-white" : ""}
                  >
                    🦉 Owl
                  </Button>
                  <Button
                    variant={character === "cat" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCharacterChange("cat")}
                    className={character === "cat" ? "bg-fluent-primary text-white" : ""}
                  >
                    🐱 Cat
                  </Button>
                  <Button
                    variant={character === "fox" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCharacterChange("fox")}
                    className={character === "fox" ? "bg-fluent-primary text-white" : ""}
                  >
                    🦊 Fox
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CharacterGuide;
