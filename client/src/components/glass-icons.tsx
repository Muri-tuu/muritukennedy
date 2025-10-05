import './glass-icons.css';

type Item = { href: string; color: 'blue'|'purple'|'red'|'indigo'|'orange'|'green'; label: string };

const gradientMapping: Record<Item['color'], string> = {
  blue: 'linear-gradient(hsl(223 90% 50%), hsl(208 90% 50%))',
  purple: 'linear-gradient(hsl(283 90% 50%), hsl(268 90% 50%))',
  red: 'linear-gradient(hsl(3 90% 50%), hsl(348 90% 50%))',
  indigo: 'linear-gradient(hsl(253 90% 50%), hsl(238 90% 50%))',
  orange: 'linear-gradient(hsl(43 90% 50%), hsl(28 90% 50%))',
  green: 'linear-gradient(hsl(123 90% 40%), hsl(108 90% 40%))'
};

export default function GlassIcons({ items, className }: { items: Item[]; className?: string }) {
  const getStyle = (color: Item['color']) => ({ background: gradientMapping[color] });
  return (
    <div className={`icon-btns ${className ?? ''}`}>
      {items.map((item, i) => (
        <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={item.label}>
          <span className="icon-btn__back" style={getStyle(item.color)} />
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">{item.label.slice(0,1)}</span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
