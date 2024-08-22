import { Link, LinkProps, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
    const { pathname } = useLocation()
    return (
        <Button asChild variant="navlink">
            <Link data-current={pathname === props.to} {...props} />
        </Button>
    )
}