import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import { alterSettingsVisibility, alterSettings } from '../../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { themes } from './editorOptions'

// const obj = {
//   "color_scheme": "monokai",
//   "font_size": 14,
//   "show_gutter": true,
//   "highlight_active_line": true,
//   "enable_snippets": true,
//   "show_print_margin": true,
//   "options": {
//   	"enableBasicAutocompletion": true,
// 	  "enableLiveAutocompletion": true,
// 	  "enableSnippets": true,
// 	  "showLineNumbers": true,
// 	  "tabSize": 2,
// 	  "useWrapMode": true,
// 	  "indentedSoftWrap": false
//   }
// }


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  settings: {
  	height: 'auto',
  	width: '402px',
  	margin: '0 20px',
  	background: '#363636',
  	position: 'relative'
  },
  drop: {
  	position: 'absolute',
  	top: 0,
  	right: 0,
  	zIndex: 10,
  },
  settingsList: {
  	'& .MuiListItem-root': {
  		justifyContent: 'center',
  		paddingTop: 0,
  		paddingBottom: '14px'
  	}
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 242,
  },
  fontPropsItem: {
		padding: '5px 10px',
		display: 'flex',
		minWidth: '242px',
		alignItems: 'center',
		justifyContent: 'space-between',
		'& .MuiTypography-root': {
			marginRight: '50px'
		}
	},
  textProp: {
		display: 'flex',
		alignItems: 'center',
		'& button': {
			padding: '5px'
		},
		'& svg': {
			cursor: 'pointer',
			fontSize: '1.35rem'
		}

	},
}));

const handleFetch = (obj) => {
	fetch(`/settings/${JSON.parse(localStorage.getItem('user')).id}`, {
		method: 'post',
		headers: {
			'content-Type': 'application/json',
		},
		body: JSON.stringify({obj: obj})
	})
	.then(res => res.json())
	.then(obj => {
		return obj
	})
}

const Settings = () => {
	const dispatch = useDispatch()
	const classes = useStyles();
  const [openBackdrop, setBackdrop] = React.useState(true);
  const handleClose = () => {
		dispatch(alterSettingsVisibility())
    setBackdrop(false);
  };
	const handleFetch = (obj) => {
		fetch(`/settings/${JSON.parse(localStorage.getItem('user')).id}`, {
			method: 'post',
			headers: {
				'content-Type': 'application/json',
			},
			body: JSON.stringify({obj: obj})
		})
		.then(res => res.json())
		.then(obj => {
			dispatch(alterSettings(obj))
		})
	}

  const handleModeClose = () => {
    setSelectVisibility(false);
  };

  const handleModeOpen = () => {
    setSelectVisibility(true);
  };
  const {color_scheme, tab_size, font_size, show_gutter, enable_snippets, wrapEnabled}
	 = useSelector(state => state.app.editorSettings)

  const [showSelect, setSelectVisibility] = React.useState(false);

  const handleModeChange = (event) => {
    handleFetch({color_scheme: event.target.value})
  };

  const changeFontSize = (val) => {
		if (val === 'min') {
			font_size > 1 && handleFetch({font_size: font_size -1})
		}

		if (val === 'add') {
			handleFetch({font_size: font_size +1})
		}
	}
	
	const handleSwitches = (obj) => {
		handleFetch(obj)		
	}
  const changeTabSize = (val) => {
  	if (val === 'min') {
			tab_size > 1 && handleFetch({tab_size: tab_size -1})
		}

		if (val === 'add') {
			handleFetch({tab_size: tab_size +1})
		}
  }
	return (
    <Backdrop className={classes.backdrop} open={openBackdrop}>
      <section className={classes.settings}>
      	<div className={classes.drop} onClick={handleClose} >
      	 <IconButton>
      	 	<CloseIcon style={{fontSize: '1.1rem'}} />
      	 </IconButton>
      	</div>
    		<List 
    			className={classes.settingsList}
    			subheader={
		        <ListSubheader component="div" id="nested-list-subheader">
		          Editor settings
		        </ListSubheader>
		      }
    		>
    			<ListItem className={classes.listItem} >
    				<FormControl className={classes.formControl}>
			        <InputLabel id="demo-controlled-open-select-label"> scheme </InputLabel>
			        <Select
			          labelId="demo-controlled-open-select-label"
			          id="demo-controlled-open-select"
			          open={showSelect}
			          onClose={handleModeClose}
			          onOpen={handleModeOpen}
			          value={color_scheme}
			          onChange={handleModeChange}
			        >
			        	<MenuItem value={color_scheme}>
			        		{color_scheme}
			        	</MenuItem>
			          {themes.map((theme, i) => {
			          	return (
			          		theme !== color_scheme &&
				          		<MenuItem key={i} value={theme} >
				          			{theme}
				          		</MenuItem>
			          	)
			          })}
			        </Select>
			      </FormControl>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
							<Typography component='span'> Font size </Typography>
							<span className={[classes.textProp].join(' ')}>
								<IconButton onClick={() => changeFontSize('min')} >
									<KeyboardArrowDownIcon  />
								</IconButton>
								<span style={{fontSize: '.9rem'}}> {font_size} </span>
								<IconButton onClick={() => changeFontSize('add')} >
									<KeyboardArrowUpIcon />
								</IconButton>
							</span>
						</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
							<Typography component='span'> Tab size </Typography>
							<span className={[classes.textProp].join(' ')}>
								<IconButton onClick={() => changeTabSize('min')} >
									<KeyboardArrowDownIcon  />
								</IconButton>
								<span style={{fontSize: '.9rem'}}> {tab_size} </span>
								<IconButton onClick={() => changeTabSize('add')} >
									<KeyboardArrowUpIcon />
								</IconButton>
							</span>
						</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
	    				<Typography component='span'> Show gutter </Typography>
							<span className={[classes.textProp].join(' ')}>
	    					<Switch name='show_gutter' checked={show_gutter} 
	    						onChange={() => handleSwitches({'show_gutter': !show_gutter})} />
	    				</span>
	    			</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
	    				<Typography component='span'> Wrap enabled </Typography>
							<span className={[classes.textProp].join(' ')}>
	    					<Switch name='wrapEnabled' checked={wrapEnabled} 
	    						onChange={() => handleSwitches({'wrapEnabled': !wrapEnabled})} />
	    				</span>
	    			</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
	    				<Typography component='span'> Enable snippets </Typography>
							<span className={[classes.textProp].join(' ')}>
	    					<Switch name='enable_snippets' checked={enable_snippets} 
	    						onChange={() => handleSwitches({'enable_snippets': !enable_snippets})} />
	    				</span>
	    			</div>
    			</ListItem>
    		</List>
      </section>
    </Backdrop>
	)
}

export default Settings