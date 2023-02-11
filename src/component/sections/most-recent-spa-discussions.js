import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
import TimeSinceCreation from "../TimeSinceCreation "
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { NavLink } from "react-router-dom";
import { getAllSpaForum } from "../../axiosCalls";
import "../../css/main.css";
import Parser from "html-react-parser";
import Pagination from "../../accounts/component/Pagination"
const MostRecentSpaDiscussion = () => {
  const [title, setTitle] = useState("");
  const [allSpaForum, setAllSpaForum] = useState([]);
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [value, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0)
  const [forumtPerPage, setForumPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;
  useEffect(() => {
    setTitle("Most Recent Spa Discussions");

    const fetchData = async () => {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }
      await getAllSpaForum(firstForumIndex, forumtPerPage).then((res) => {

        setTotalForum(res.data.data.hits.total.value)
        setAllSpaForum(res.data.data.hits.hits);
      });
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = () => {
    setSearchValue(value);
  };

  const filteredAllSpa = allSpaForum?.filter((item) => {
    return searchValue !== ""
      ? item.topic?.toLowerCase().includes(searchValue?.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchValue?.toLowerCase())
      : item;
  });

  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  const nOfThread = (comment) => {
    let threads = 0;
    comment?.map((singleComment) => {
      if (singleComment.Replies.length > 0) {
        threads++;
      }
    });
    return threads;
  };

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }



  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };

  return (
    <>
      <br />
      <MDBRow className="discussion-section panel-row">
        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12} className="panel-head">
              <MDBRow className="panelHeading">
                <MDBCol md={6}>
                  <p className="customComponent-title">{title}</p>
                </MDBCol>
                <MDBCol md={6}>
                  {/* <div class="input-group home-searxh-disscusion">
                    <input
                      type="search"
                      class="form-control "
                      placeholder="Search here..."
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search"
                      aria-describedby="search-addon"
                      onKeyPress={handleKeypress}
                    />
                    <button
                      type="button"
                      class="btn btn-outline"
                      onClick={handleSearch}
                    >
                      search
                    </button>
                  </div> */}
                </MDBCol>
              </MDBRow>

              {filteredAllSpa?.map((currentValue) => (
                <>
                                  {currentValue._source.payload.masseuse.isDeleted ===false && <> 
                  <MDBRow className="mostRecentDiscussion-div">
                    <MDBRow style={{ paddingTop: "1%" }}>
                      <MDBCol md={12} className="flex daysCount-flex">

                        <NavLink
                          // to="/spa-thread"
                          state={{ singleSpa: currentValue._source.payload.masseuse }}
                          to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                          className="topicForum"
                        >
                          <span className="comment-heading ">
                            {currentValue._source.payload.masseuse.topic}
                          </span>
                        </NavLink>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="daysCount mt-auto">
                          {currentValue._source.payload.masseuse.createdAt.substring(0, 10)}{" "}
                          &nbsp;&nbsp;&nbsp;
                          {formatTime(currentValue._source.payload.masseuse.createdAt.substring(11, 16))}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md={8}>
                        <p>{Parser(currentValue._source.payload.masseuse.description)}</p>
                      </MDBCol>
                      <MDBCol md={2} className="right plr-0 col-6">
                        <NavLink
                          state={{ singleSpa: currentValue._source.payload.masseuse }}
                          to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                        >

                          <span className="viewsCount-comment" style={{ color: "#4f4f4f" }}>
                            <img src={views} alt="eye icon" />
                            &nbsp;&nbsp; <b> {currentValue._source.payload.masseuse.views} views </b>
                          </span>
                        </NavLink>
                      </MDBCol>
                      <MDBCol md={2} className="right plr-0 col-6">
                        <NavLink
                          state={{ singleSpa: currentValue._source.payload.masseuse }}
                          to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                        >
                          <b className="commentCount" style={{ color: "#4f4f4f" }}>
                            {currentValue._source.payload.masseuse.no_comments + " "} Comments{" "}
                          </b>
                        </NavLink>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md={6}>
                        <span className="daytime">
                        <TimeSinceCreation createdAt={currentValue._source.payload.masseuse.createdAt} />
                        </span>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <NavLink
                          to={"/single-spa?id=" + currentValue._source.payload.masseuse.spaId}
                          state={{ singleSpa: currentValue._source.payload.masseuse }}
                        >
                          <img
                            style={{ cursor: "pointer" }}
                            src={commentIcon}
                            alt="comment icon"
                            className="chatIcon"
                          />
                        </NavLink>
                      </MDBCol>
                    </MDBRow>
                  </MDBRow>
                  <hr />
                  </>
                   }
                </>
              ))}
            </MDBCol>
            <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <br />
    </>
  );
};
export default MostRecentSpaDiscussion;
