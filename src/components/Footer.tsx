const Footer = () => {
    return (
        <footer className="w-full py-6 mt-auto flex flex-col items-center justify-center gap-2">
            <div className="h-px w-12 bg-[#31757A]/30 mb-2"></div>
            <p className="text-[#ABBABA]/70 text-xs font-medium tracking-widest uppercase">
                NaPa Counter • by Arefur Rahman with ❤️
            </p>
            <p className="text-[#41A4A7]/50 text-[10px] uppercase tracking-tighter">
                &copy; {new Date().getFullYear()} • Pure NaPa • No Side Effects
            </p>
        </footer>
    );
};

export default Footer;
