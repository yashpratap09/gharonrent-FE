"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  Eye,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center ">
          
           {theme === "dark" ?  <Image src="/images/logo.png" alt="Logo" width={100} height={60} /> : <Image src="/images/logo_black.png" alt="Logo" width={100} height={60} />}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 h-auto p-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-sm uppercase">
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                       <DropdownMenuItem asChild>
                          <div className="text-left">
                            <p className="text-sm font-medium">Welcome  {user?.name?.split(" ")[0] || "User"}</p>
                          </div>
                        </DropdownMenuItem>
                    {user?.userType === "user" ? (
                      // Tenant Menu
                      <>
                     
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard?tab=wishlist"
                            className="flex items-center"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Wishlist
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard?tab=viewed"
                            className="flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Recently Viewed
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      // Host/Property Owner Menu
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/add-property"
                            className="flex items-center"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Property
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard?tab=properties"
                            className="flex items-center"
                          >
                            <Home className="h-4 w-4 mr-2" />
                            My Properties
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Add Property Button for Hosts */}
                {user?.userType !== "user" && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    <Link href="/add-property">List Property</Link>
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Button variant="secondary" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/search"
                className="text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {isAuthenticated ? (
                <div className="pt-4 space-y-2 px-4 border-t">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Welcome</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.name || "User"}
                      </p>
                    </div>
                  </div>

                  {user?.userType === "user" ? (
                    // Tenant Mobile Menu
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/dashboard?tab=wishlist"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/dashboard?tab=viewed"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Recently Viewed
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                    </>
                  ) : (
                    // Host Mobile Menu
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/add-property"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/dashboard?tab=properties"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Home className="h-4 w-4 mr-2" />
                          My Properties
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4 space-y-2 px-4">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    asChild
                  >
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
