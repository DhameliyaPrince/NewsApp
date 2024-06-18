import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("Hello! I am a constructor from NewsComponent");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
    }

    async componentDidMount() {
        this.updateNews();
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=054ba42c7a8e45e98faea294ed081755&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.updateNews);
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.updateNews);
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className='my-4 text-center'>NewsMonkey - Top Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItems
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
                            &larr; Previous
                        </button>
                        <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default News;