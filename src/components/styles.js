export default {
	universal: {
		hr: {
			borderColor: 'lightgrey', 
			width:95+'%'
		}

	},
	navBar: {
		width:100+'%', 
		padding:0, 
		margin:0, 
		background:'#f9f9f9', 
		fontSize:14, 
		fontWeight:500
	},
	form: {
		container: {
			width: 100+'%',
			height: 'calc(100vh - 52px)',
			padding: 0,
			margin: 0
		},
		header: {
			fontFamily: "'Arial', serif",
			fontWeight: 'bold',
			textAlign: 'center',
			marginTop: 20,
		},
		leftpanel: {
			width:50 + '%',
			padding:5,
			height: 100+'%',
			float: 'left',
			background: 'linen',
			overflow:'auto'
		},
		rightpanel: {
			width:50 + '%',
			height: 100+'%',
			float: 'right',
			background: 'lightsteelblue',
			overflow:'auto'
		},
		centerButton: {
			margin:'20px 45%'
		},
		formgroup: {
			width:95+'%', 
			marginLeft:'auto', 
			marginRight:'auto',
		},
		label: {
			float:'left', 
			marginRight:2+'%',
			fontSize: 16
		},
		selectionBox: {
			width: 50+'%',
		},
		textarea: {
			width: 100 + '%'
		},
		list: {
			listStyle:'none',
			padding: 0,
			margin:0
		}
	},
	comment: {
		commentsBox: {
			padding: 12,
			background: '#f9f9f9',
			border: '1px solid #ddd'
		},
		commentsList: {
			listStyleType: 'none'
		}
	},
	zone: {
		container: {
			padding:16, 
			background:'#f9f9f9', 
			marginTop:12, 
			border:'1px solid #ddd'
		},
		header: {
			marginTop:0,
			marginBottom:0+'px'
		},
		title: {
			textDecoration:'none', 
			color: 'red'
		}
	}
}