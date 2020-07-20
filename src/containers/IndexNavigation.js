import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {getAllUsers} from '../actions/user.js'
import {getAllBreweries} from '../actions/brewery.js'
import {getAllCircuits} from '../actions/circuit.js'
import FormMessage from '../components/FormMessage.js'
import IndexTable from './IndexTable.js'

class IndexNavigation extends Component {

    state = {
        keyword: '',
        keywordKey: '',
        icon: '',
        data: [],
        tableHeadings: [], // The strings that will be displayed as table headings
        tableDataColumns: [] // The object keys that will be used to pull the data, must match the order of tableHeadings
    }

    fetchData = async () => {
        switch (this.props.variant) {
            case "breweries":
                this.props.getAllBreweries()
                break
            case "circuits":
                this.props.getAllCircuits()
                break
            case "runners":
                this.props.getAllUsers()
                break
            default:
                break
        }
    }

    setVariantion = () => {
        // Wait for data to be pulled from backend before setting state
        this.fetchData()

        switch (this.props.variant) {
            case "breweries":
                this.setState({
                    keywordKey: 'name',
                    icon: <i className="fas fa-industry"/>,
                    data: this.props.breweries,
                    tableHeadings: ['Name', 'Type', 'Rating', 'Likes', 'Tags', 'Address', 'Website'],
                    tableDataColumns: ['name', 'brewery_type', 'rating', 'likes_count', 'tag_list', 'full_address', 'website_url']
                })
                break 
            case "circuits":
                this.setState({
                    keywordKey: 'title',
                    icon: <i className="fas fa-route"/>,
                    data: this.props.circuits,
                    tableHeadings: ['Title', 'Rating', 'Likes', 'Favorites', 'Reviews'],
                    tableDataColumns: ['title', 'rating', 'likes_count', 'favorites_count', 'reviews_count']
                })
                break 
            case "runners":
                this.setState({
                    keywordKey: 'full_name',
                    icon: <i className="fas fa-running"/>,
                    data: this.props.users,
                    tableHeadings: ['Name', 'Circuits', 'Followers'],
                    tableDataColumns: ['full_name', 'public_circuits_count', 'followers_count']
                })
                break 
            default:
                break
        }
    }

    componentDidMount() {
        this.setVariantion()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    capitalize = (string) => {
        if (typeof string !== 'string') return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    filterDataByName = () => {
        if (this.state.keyword) {
            return this.state.data.filter(datum => datum[this.state.keywordKey].toLowerCase().includes(this.state.keyword.toLowerCase()))
        } else {
            return this.state.data
        }
    }

    render () {
        return (
            <div className="my-3 mx-5 border border-secondary rounded-lg">
                <Navbar className="shadow" bg="primary" variant="dark">
                    <Navbar.Brand>
                        {this.state.icon}
                        <span className="d-none d-sm-none d-md-inline"> {this.capitalize(this.props.variant)}</span>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className="nav-link" exact to={"/" + this.props.variant + "/table"} title="Table View">
                                <i className="fas fa-table"/>
                                <span className="d-none d-sm-none d-md-inline"> Table View</span>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" exact to={"/" + this.props.variant + "/grid"} title="Grid View">
                                <i className="fas fa-th"/>
                                <span className="d-none d-sm-none d-md-inline"> Grid View</span>
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Form inline>
                        <Form.Control type="search" placeholder={this.capitalize(this.props.variant) + " Name Search"} aria-label="Search" name="keyword" value={this.state.keyword} onChange={event => this.handleChange(event)}/>
                    </Form>
                </Navbar>
                <FormMessage />
                <IndexTable data={this.filterDataByName()} headings={this.state.tableHeadings} columns={this.state.tableDataColumns}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.all,
        breweries: state.brewery.all,
        circuits: state.circuit.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => {dispatch(getAllUsers())},
        getAllBreweries: () => {dispatch(getAllBreweries())},
        getAllCircuits: () => {dispatch(getAllCircuits())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexNavigation)