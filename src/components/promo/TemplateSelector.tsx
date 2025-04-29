
import { StoryTemplate } from "@/components/promo/StoryCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TemplateSelectorProps = {
  templates: StoryTemplate[];
  selectedTemplate: StoryTemplate;
  onSelectTemplate: (template: StoryTemplate) => void;
};

export const TemplateSelector = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Selecionar template</h3>
      <div className="flex flex-wrap gap-3">
        {templates.map((template) => (
          <Button
            key={template.id}
            type="button"
            variant={template.id === selectedTemplate.id ? "default" : "outline"}
            className={cn(
              "flex-1 min-w-24 h-12",
              template.id === selectedTemplate.id && "ring-2 ring-offset-2 ring-primary"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            <div className={cn("w-full h-full rounded", template.gradientClass)}></div>
          </Button>
        ))}
      </div>
    </div>
  );
};
