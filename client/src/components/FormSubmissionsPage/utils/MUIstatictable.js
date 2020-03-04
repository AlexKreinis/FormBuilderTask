import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: " #eaf2f8 "
  }
}));

export default function ListDividers({ submissions }) {
  const classes = useStyles();

  const makeLists = () => {
    return submissions.map((header, index) => {
      return (
        <List component="nav" className={classes.root} key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ArrowDownwardIcon />
              </Avatar>
            </ListItemAvatar>
            <h1> {header.inputName}</h1>
          </ListItem>
          <Divider />
          {header.inputData.map((row, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={row.value} />
              </ListItem>
            );
          })}
        </List>
      );
    });
  };
  return (
    <div
      style={{
        display: "flex",

        alignItems: "center"
      }}
    >
      {makeLists()}
    </div>
  );
}
ListDividers.propTypes = {
  submissions: PropTypes.array.isRequired
};
