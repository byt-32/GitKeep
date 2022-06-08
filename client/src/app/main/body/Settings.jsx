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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import { alterSettingsVisible, setPreferences } from '../../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { themes } from './editorOptions'

const obj = {
  "color_scheme": "monokai",
  "font_size": 14,
  "show_gutter": true,
  "highlight_active_line": true,
  "enable_snippets": true,
  "show_print_margin": true,
  "options": {
  	"enableBasicAutocompletion": true,
	  "enableLiveAutocompletion": true,
	  "enableSnippets": true,
	  "showLineNumbers": true,
	  "tabSize": 2,
	  "useWrapMode": true,
	  "indentedSoftWrap": false
  }
}


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
    minWidth: 230,
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


const Settings = () => {
	const dispatch = useDispatch()
	const classes = useStyles();
  const [openBackdrop, setBackdrop] = React.useState(true);
  const handleClose = () => {
		dispatch(alterSettingsVisible())
    setBackdrop(false);
  };

  const {color_scheme, tab_size, font_size, show_gutter, enable_snippets}
	 = useSelector(state => state.app.editorSettings)

  const [showSelect, setSelectVisibility] = React.useState(false);
  // const [selectedTheme, setSelectedTheme] = React.useState(color_scheme)

  const handleModeChange = (event) => {
    // setSelectedTheme(event.target.value);
  };

  const handleModeClose = () => {
    setSelectVisibility(false);
  };

  const handleModeOpen = () => {
    setSelectVisibility(true);
  };
  const changeFontSize = (val) => {
		if (val === 'min') {
			font_size > 1 && dispatch(setPreferences({font_size: font_size -1}))
		}

		if (val === 'add') {
			dispatch(setPreferences({font_size: font_size +1}))
		}
			
	}
  const changeTabSize = (value) => {

  }
	return (
    <Backdrop className={classes.backdrop} open={openBackdrop}>
      <section className={classes.settings}>
      	<div className={classes.drop}>
      	 <IconButton>
      	 	<ArrowDownwardIcon />
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
	    					<Switch name='show_gutter' checked={true} onChange={() => handleSwitches('show_gutter')} />
	    				</span>
	    			</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
	    				<Typography component='span'> Use wrap mode </Typography>
							<span className={[classes.textProp].join(' ')}>
	    					<Switch name='useWrapMode' checked={true} onChange={() => handleSwitches('useWrapMode')} />
	    				</span>
	    			</div>
    			</ListItem>
    			<ListItem>
    				<div className={classes.fontPropsItem}>
	    				<Typography component='span'> Enable snippets </Typography>
							<span className={[classes.textProp].join(' ')}>
	    					<Switch name='enable_snippets' checked={true} onChange={() => handleSwitches('enable_snippets')} />
	    				</span>
	    			</div>
    			</ListItem>
    		</List>
      </section>
    </Backdrop>
	)
}

export default Settings