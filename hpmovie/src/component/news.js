import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as action from "../redux/action";
import Button from "@material-ui/core/Button";

import NewItem from "./new-item";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function News(props) {
  const [stateCategoryId, setStateCategoryId] = useState({
    categoryId: "5e29fa820a21840e23b36875"
  });

  const [stateXemThem, setstateXemThem] = useState(6);

  useEffect(() => {
    props.getNewsCategory();
    props.getNews();
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderListNewsCategory = () => {
    if (props.listNewsCategory.category) {
      return props.listNewsCategory.category.map((item, index) => {
        return (
          <LinkTab
            key={index}
            label={item.name}
            {...a11yProps(0)}
            onClick={() => {
              setStateCategoryId({ categoryId: item._id });
            }}
          />
        );
      });
    }
  };

  const renderTabPanel = () => {
   
    if (props.listNewsCategory.category) {
      return props.listNewsCategory.category.map((item, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <NewItem
              key={index}
              mangListNew={props.listNews}
              stateXemThem={stateXemThem}
              categoryId={stateCategoryId.categoryId}
            />
          </TabPanel>
        );
      });
    }
  };

  // const tangXemThem = ()=>{
  //   setstateXemThem(stateXemThem + 4)
  //   console.log("hihihi")
  // }

  let mangListNew;
  if (props.listNews) {
    mangListNew = props.listNews.filter(item => {
      return item.categoryId._id == stateCategoryId.categoryId;
    });
  }

  const tangSo = () => {
    setstateXemThem(stateXemThem + 4);
  };
  let diss = false;
  let btnXemThem = "Xem Thêm";
  if (mangListNew) {
    if (mangListNew.length < stateXemThem) {
      diss = true;
      btnXemThem = "Hết Tin";
    }
  }

  return (
    <section className="news">
      <div className="clear"></div>
      <div className="news__content">
        <div style={{ background: "whitesmoke" }} className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              {renderListNewsCategory()}
            </Tabs>
          </AppBar>

          {renderTabPanel()}
        </div>
        <div className="btn_detail_new">
          <Button
            disabled={diss}
            onClick={tangSo}
            variant="outlined"
            color="primary"
          >
            {btnXemThem}
          </Button>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  return {
    listNewsCategory: state.movieReducer.listNewsCategory,
    listNews: state.movieReducer.listNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNewsCategory: () => {
      dispatch(action.actGetNewsCategory());
    },
    getNews: () => {
      dispatch(action.actGetNews());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
