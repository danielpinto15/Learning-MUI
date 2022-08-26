import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { SubjectOutlined, AddCircleOutlineOutlined }  from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import format from 'date-fns/format';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            heigth: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background:'#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: '1'
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

export default function Layout ({ children }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItens = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create notes',
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/create'
        }
    ]

  return (
    <div className={classes.root}>
        <AppBar 
            elevation={0} 
            className={classes.appBar}
        >
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>
                <Typography>
                    Mario
                </Typography>
                <Avatar className={classes.avatar} src='/mario-av.png' />
            </Toolbar>
        </AppBar>
        <Drawer 
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div>
                <Typography variant='h5' className={classes.title}>
                    Ninja Notes
                </Typography>
            </div>
            <List>
               {menuItens.map(item => (
                <ListItem 
                    button
                    key={item.text} 
                    onClick={() => navigate(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
               ))}
            </List>
        </Drawer>
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div>
    </div>
  )
}
