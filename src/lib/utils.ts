export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).map(c => typeof c === 'string' ? c.trim() : '').join(' ');
}
