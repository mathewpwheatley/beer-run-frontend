import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getBrewery} from '../actions/brewery.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonNavigation from './CommonNavigation.js'
import CreateReview from './CreateReview.js'
import FavoriteButton from '../components/FavoriteButton.js'
import LikeButton from '../components/LikeButton.js'


class Brewery extends Component {

    componentDidMount() {
        this.props.getBrewery(this.props.id)
    }

    render () {
        const brewery = this.props.brewery

        return (
            <CardColumns className="p-4">

                <FetchMessage/>

                <Card>
                    <Card.Header>Brewery Information</Card.Header>
                    <Card.Body>
                        <Card.Title>Name: {brewery.name}</Card.Title>
                        <Card.Text>Type: {brewery.brewery_type}</Card.Text>
                        <Card.Text>Tags: {brewery.tag_list}</Card.Text>
                        <Card.Text>Address: {brewery.full_address}</Card.Text>
                        <Card.Text>Phone: {brewery.phone}</Card.Text>
                        <Card.Text><Button variant="outline-secondary" href={brewery.website_url} >Brewery Website</Button></Card.Text>
                        {!!this.props.userId &&
                            <Fragment>
                                <FavoriteButton variant="brewery" favoriteId={brewery.active_user_favorite_id} userId={this.props.userId} subjectId={brewery.id} />
                                <LikeButton variant="brewery" likeId={brewery.active_user_like_id} userId={this.props.userId} subjectId={brewery.id} />
                            </Fragment>
                        }
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Statistics</Card.Header>
                    <Card.Body>
                        <Card.Text>Circuits: {brewery.public_circuits_count}</Card.Text>
                        <Card.Text>Favorited: {brewery.favorites_count}</Card.Text>
                        <Card.Text>Likes: {brewery.likes_count}</Card.Text>
                        <Card.Text>Reviews: {brewery.reviews_count}</Card.Text>
                        <Card.Text>Rating: {brewery.rating}</Card.Text>
                    </Card.Body>
                </Card>

                {!!brewery.public_circuits &&
                    <CommonNavigation variant='circuits' data={brewery.public_circuits} />
                }

                {!!brewery.reviews &&
                    <CommonNavigation variant='brewery-reviews' data={brewery.reviews} />
                }

                <CreateReview variant='brewery-review' subjectId={brewery.id} subjectName={brewery.name}/>

            </CardColumns>
        )
    }
}

const mapStateToProps = state => {
    return {
        brewery: state.brewery.selected,
        userId: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrewery: (id) => {dispatch(getBrewery(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brewery)