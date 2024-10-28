import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Link } from "react-router-dom"
import { logoutUser } from './features/user/userSlice';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';
import {
    Tag,
    CircleUser,
    Home,
    ShoppingCart,
    LayoutList,
    Building2,
    UsersRound,
    CalendarClock,
    SearchIcon,
    ContactRound,
    BookUser,
    Ticket,
    FileBox,
    ChartLine,
    Rss
} from "lucide-react"
import Logo from './components/ui/LogoCrm.svg'
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/themeProvider"
import { useDispatch } from 'react-redux'


export function ModeToggle() {
    const { setTheme } = useTheme()



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const sidebarItems = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/dashboard',
        icon: <Home className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 2,
        name: 'Customers',
        link: '',
        icon: null,
        type: 'heading'
    },
    {
        id: 3,
        name: 'Contacts',
        link: '/contact',
        icon: <BookUser className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 4,
        name: 'Companies',
        link: '/dashboard',
        icon: <Building2 className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 5,
        name: 'Service Desk',
        link: '',
        icon: null,
        type: 'heading'
    },
    {
        id: 6,
        name: 'Tickets',
        link: '/tickets',
        icon: <Ticket className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 7,
        name: 'Tasks',
        link: '/dashboard',
        icon: <LayoutList className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 8,
        name: 'Sales',
        link: '',
        icon: null,
        type: 'heading'
    },
    {
        id: 9,
        name: 'Opportunities',
        link: '/dashboard',
        icon: <ShoppingCart className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 10,
        name: 'Campaigns',
        link: '/dashboard',
        icon: <CalendarClock className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 11,
        name: 'Admin Panel',
        link: '',
        icon: null,
        type: 'heading'
    },
    {
        id: 12,
        name: 'Users',
        link: '/dashboard',
        icon: <ContactRound className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 13,
        name: 'Groups',
        link: '/dashboard',
        icon: <UsersRound className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 14,
        name: 'Types',
        link: '/dashboard',
        icon: <Tag className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 15,
        name: 'Sub Types',
        link: '/dashboard',
        icon: <FileBox className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 16,
        name: 'Analytics',
        link: '/dashboard',
        icon: <ChartLine className="h-4 w-4" />,
        type: 'link'
    },
    {
        id: 17,
        name: 'News Feed',
        link: '/dashboard',
        icon: <Rss className="h-4 w-4" />,
        type: 'link'
    },
]

const Layout = () => {
    const location = useLocation();
    const link = location.pathname.substring(location.pathname.indexOf('/'));
    const [active, setActive] = useState(link)
    const [item, setItem] = useState("Ticket")
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        const auth_token = Cookies.get('auth_token')
        try {
            await dispatch(logoutUser(user, token, auth_token)).then((result) => {

                localStorage.removeItem('user')
                localStorage.removeItem('token')
                navigate('/login')
                window.location.reload(true);
            })
            // Redirect to login page after logout
        } catch (error) {
            console.log('Logout failed: ', error);
            // Optional: Show an error alert if logout fails
        }

    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the page is scrolled by more than 50px (or any threshold you prefer)
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen w-full">
            {/* Sidebar */}
            <div className="hidden border-r bg-muted/40 md:block w-[220px] lg:w-[280px] h-screen fixed left-0 top-0">
                <div className="flex flex-col h-full gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <img src={Logo} className="h-8" />
                            <span className="text-lg font-semibold">BrightPath</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {sidebarItems.map(({ id, name, link, icon, type }) => {
                                const lctext = (str) => str.replace(/\s/g, '').toLowerCase();
                                if (type === "link") {
                                    return (
                                        <Link
                                            key={id}
                                            to={link}
                                            onClick={() => setActive(lctext(name))}
                                            className={
                                                lctext(name) === active
                                                    ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                            }
                                        >
                                            {icon}
                                            {name}
                                        </Link>
                                    );
                                } else if (type === 'heading') {
                                    return (
                                        <div key={id} className="flex h-10 items-center border-b px-4 lg:h-[60px] lg:px-6">
                                            {name}
                                        </div>
                                    );
                                }
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-[220px] lg:ml-[280px] flex flex-col w-full">
                {/* Navbar */}
                <header className={`
                    flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 fixed top-0 left-[220px] lg:left-[280px] right-0 z-10 transition-colors duration-300
                    ${isScrolled ? "bg-muted" : "bg-muted/40"}
                    `}>
                    <div className="w-full flex-1">
                        <div className="w-2/3 mx-4 flex items-center space-x-1">
                            <DropdownMenu className="min-w-1/2">
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">SEARCH {item.toUpperCase()}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Search</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={item} onValueChange={setItem}>
                                        <DropdownMenuRadioItem value="User">User</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Contact">Contact</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Ticket">Ticket</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Customer">Customer</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Company">Company</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Opportunity">Opportunity</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Campaign">Campaign</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="relative flex-grow w-full">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>Hello, {user.first_name}</div>

                    <div className="flex-shrink-0">
                        <ModeToggle />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
            </div>
            {/* Main Scrollable Content */}
            <main className="mt-[60px] ml-[220px] lg:ml-[280px] p-4 lg:p-6">
                <Outlet />
            </main>

        </div>
    )
}

export default Layout