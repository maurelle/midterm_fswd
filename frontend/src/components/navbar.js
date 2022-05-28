import Link from "next/link"
import { useContext, useState } from "react"
import { TagContext } from "../../contexts/TagContext"
import { CategoryContext } from "../../contexts/CategoryContext"
import { Container, Nav, Navbar, NavDropdown, } from 'react-bootstrap'
import Image from "react-bootstrap/Image";


const NavBar = () => {
    const tagsNav = useContext(TagContext)
    const categorieNav = useContext(CategoryContext)

    return (
        <Navbar bg='info' variant='light' expand='lg'className="shadow p-3 mb-5">
            <Container>
                
                <Navbar.Brand href="/">
                <Image
                    src="https://cdn-icons-png.flaticon.com/512/49/49046.png"
                    width="30"
                    height="30"
                    />
                        Blog Blog
                        
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <NavDropdown title="Tags">
                            {
                                !!tagsNav && tagsNav.map((item, index) => {
                                    return (
                                        <Link key={index} href={'/tag/' + item.id} >
                                            <NavDropdown.Item href={'/tag/' + item.id}>{ item.name }</NavDropdown.Item> 
                                        </Link>
                                    )
                                })
                            }
                        </NavDropdown>
                        <NavDropdown title="Categories">
                            {
                                !!categorieNav && categorieNav.map((item, index) => {
                                    return (
                                        <Link key={index} href={'/categories/' + item.id} >
                                            <NavDropdown.Item href={'/categories/' + item.id}>{ item.name }</NavDropdown.Item> 
                                        </Link>
                                    )
                                })
                            }
                        </NavDropdown>
                        <Nav.Link href="/comments">Comments</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar