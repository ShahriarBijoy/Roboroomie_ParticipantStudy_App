import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function SliderDemo() {
  const min = 1;
  const max = 5;
  const skipInterval = 1;
  const ticks = [...Array(max)].map((_, i) => i + 1); // Will generate [1,2,3,4,5]

  return (
    <div className="space-y-4">
      <Label></Label>
      <div>
        <Slider 
          defaultValue={[3]} 
          min={min}
          max={max} 
          aria-label="Slider with ticks" 
        />
        <span
          className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {ticks.map((i) => (
            <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
              <span
                className={cn("h-1 w-px bg-muted-foreground/70", i % skipInterval !== 0 && "h-0.5")}
              />
              <span className={cn(i % skipInterval !== 0 && "opacity-0")}>{i}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
