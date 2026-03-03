const Header = () => {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <img
                src="/napaLogo.webp"
                alt="Napa Logo"
                className="rounded-full size-20 object-cover shadow-2xl border-4 border-[#31757A]"
            />
            <h1 className="text-4xl font-headline font-bold text-[#E6F9F9] tracking-tight">
                নাপা কাউন্টার
            </h1>
        </div>
    );
};

export default Header;
