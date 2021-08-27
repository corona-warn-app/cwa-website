export default {
	"chart0": {
		"1": {
			"series": [
				{
					color: "#D68101",
					data: "app_downloads_cumulated"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_cumulated"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_cumulated"
				}
			],

		},
		"2": {
			"series": [
				{
					color: "#D68101",
					data: "app_downloads_daily",
					type: "line"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_daily",
					type: "bar"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_daily",
					type: "bar"
				}
			]
		},
		"3": {
			"series": [
				{
					color: "#D68101",
					data: "app_downloads_7days_sum",
					type: "line"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_7days_sum",
					type: "bar"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_7days_sum",
					type: "bar"
				}
			]
		},
		"4": {
			"series": [
				{
					color: "#D68101",
					data: "app_downloads_7days_avg"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_7days_avg"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_7days_avg"
				}
			]
		}	
	},

	"chart1": {
		"1": [
			{
				"series": [
					{
						color: "#D68101",
						data: "tests_total_cumulated"
					},
					{
						color: "#892405",
						data: "tests_pcr_total_cumulated"
					},
					{
						color: "#D55127",
						data: "tests_rat_total_cumulated"
					}
				],
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			}
		],
		"2": [
			{
				"series": [
					{
						color: "#D68101",
						data: "tests_total_daily",
						type: "line"
					},
					{
						color: "#892405",
						data: "tests_pcr_total_daily",
						type: "bar"
					},
					{
						color: "#D55127",
						data: "tests_rat_total_daily",
						type: "bar"
					}
				],
			},
			{
				"series": [
					{
						color: "#3BA8CE",
						data: "qr_redeemed_daily"
					},
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_daily"
					}
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_daily"
					},
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_daily"
					}
				],
				"stacked": true,
				"type":"bar"
			}
		],
		"3": [
			{
				"series": [
					{
						color: "#D68101",
						data: "tests_total_7days_sum",
						type: "line"
					},
					{
						color: "#892405",
						data: "tests_pcr_total_7days_sum",
						type: "bar"
					},
					{
						color: "#D55127",
						data: "tests_rat_total_7days_sum",
						type: "bar"
					}
				],
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_7days_sum"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_7days_sum"
					}
					
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_7days_sum"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_7days_sum"
					}
					
				],
				"stacked": true,
				"type":"bar"
			}
		]
	},


	"chart2": {
		"1": [
			{
				"series": [
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_cumulated"
					},
					{
						color: "#6A1B4D",
						data: "qr_redeemable_cumulated"
					},
					{
						color: "#B2578D",
						data: "teletan_redeemable_cumulated"
					}
				],
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_cumulated"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_cumulated"
					}
					
				],
				"stacked": true,
				"type":"area"
			}
		],
		"2": [
			{
				"series": [
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_daily",
						type: "line"
					},
					{
						color: "#004C6C",
						data: "qr_redeemable_daily",
						type: "bar"
					},
					{
						color: "#2885AC",
						data: "teletan_redeemable_daily",
						type: "bar"
					}
				],
			},
			{
				"series": [
					{
						color: "#3BA8CE",
						data: "qr_redeemed_daily"
					},
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_daily"
					}
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_daily"
					},
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_daily"
					}
				],
				"stacked": true,
				"type":"bar"
			}
		],
		"3": [
			{
				"series": [
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_7days_sum",
						type: "line"
					},
					{
						color: "#6A1B4D",
						data: "qr_redeemable_7days_sum",
						type: "bar"
					},
					{
						color: "#B2578D",
						data: "teletan_redeemable_7days_sum",
						type: "bar"
					}
				],
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_7days_sum"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_7days_sum"
					}
					
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_7days_sum"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_7days_sum"
					}
					
				],
				"stacked": true,
				"type":"bar"
			}
		]
	},
	
	"chart3": {
		"1": {
			"series": [
				{
					color: "#FF6666",
					data: "ppa_risk_red_daily"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_daily"
				}
			],
			"stacked": true,
			"type":"area"
		}	
	}
};