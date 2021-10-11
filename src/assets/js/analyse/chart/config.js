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
				},
				{
					color: "#D68101",
					data: "app_downloads_daily"
				},
				{
					color: "#6A1B4D",
					data: "app_downloads_android_daily"
				},
				{
					color: "#B2578D",
					data: "app_downloads_ios_daily"
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
						ghost: true,
						data: "tests_pcr_total_cumulated",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_pcr_positive_cumulated"
					},
					{
						color: "#02B290",
						data: "tests_pcr_negative_cumulated"
					},
					{
						color: "#CAD5E2",
						data: "tests_pcr_invalide_cumulated"
					}
				],
				"stacked": true,
				"type":"area"
			},
			{
				"series": [
					{
						ghost: true,
						data: "tests_rat_total_cumulated",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_rat_positive_cumulated"
					},
					{
						color: "#02B290",
						data: "tests_rat_negative_cumulated"
					},
					{
						color: "#CAD5E2",
						data: "tests_rat_invalide_cumulated"
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
						ghost: true,
						data: "tests_pcr_total_daily",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_pcr_positive_daily"
					},
					{
						color: "#02B290",
						data: "tests_pcr_negative_daily"
					},
					{
						color: "#CAD5E2",
						data: "tests_pcr_invalide_daily"
					}
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						ghost: true,
						data: "tests_rat_total_daily",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_rat_positive_daily"
					},
					{
						color: "#02B290",
						data: "tests_rat_negative_daily"
					},
					{
						color: "#CAD5E2",
						data: "tests_rat_invalide_daily"
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
						ghost: true,
						data: "tests_pcr_total_7days_sum",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_pcr_positive_7days_sum"
					},
					{
						color: "#02B290",
						data: "tests_pcr_negative_7days_sum"
					},
					{
						color: "#CAD5E2",
						data: "tests_pcr_invalide_7days_sum"
					}
				],
				"stacked": true,
				"type":"bar"
			},
			{
				"series": [
					{
						ghost: true,
						data: "tests_rat_total_7days_sum",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_rat_positive_7days_sum"
					},
					{
						color: "#02B290",
						data: "tests_rat_negative_7days_sum"
					},
					{
						color: "#CAD5E2",
						data: "tests_rat_invalide_7days_sum"
					}
				],
				"stacked": true,
				"type":"bar"
			}
		],
		"4": [
			{
				"series": [
					{
						color: "#D68101",
						data: "tests_total_7days_avg"
					},
					{
						color: "#892405",
						data: "tests_pcr_total_7days_avg"
					},
					{
						color: "#D55127",
						data: "tests_rat_total_7days_avg"
					},
					{
						color: "#D68101",
						data: "tests_total_daily"
					},
					{
						color: "#892405",
						data: "tests_pcr_total_daily"
					},
					{
						color: "#D55127",
						data: "tests_rat_total_daily"
					}
				],
			},
			{
				"series": [
					{
						ghost: true,
						data: "tests_pcr_total_7days_avg",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_pcr_positive_7days_avg"
					},
					{
						color: "#02B290",
						data: "tests_pcr_negative_7days_avg"
					},
					{
						color: "#CAD5E2",
						data: "tests_pcr_invalide_7days_avg"
					},
					{
						ghost: true,
						data: "tests_pcr_total_daily",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_pcr_positive_daily"
					},
					{
						color: "#02B290",
						data: "tests_pcr_negative_daily"
					},
					{
						color: "#CAD5E2",
						data: "tests_pcr_invalide_daily"
					}
				]
			},
			{
				"series": [
					{
						ghost: true,
						data: "tests_rat_total_7days_avg",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_rat_positive_7days_avg"
					},
					{
						color: "#02B290",
						data: "tests_rat_negative_7days_avg"
					},
					{
						color: "#CAD5E2",
						data: "tests_rat_invalide_7days_avg"
					},
					{
						ghost: true,
						data: "tests_rat_total_daily",
						name: "total"
					},
					{
						color: "#FF774C",
						data: "tests_rat_positive_daily"
					},
					{
						color: "#02B290",
						data: "tests_rat_negative_daily"
					},
					{
						color: "#CAD5E2",
						data: "tests_rat_invalide_daily"
					}
				]
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
						ghost: true,
						data: "qr_redeemable_cumulated",
						name: "total"
					},
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
						ghost: true,
						data: "teletan_redeemable_cumulated",
						name: "total"
					},
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
						ghost: true,
						data: "qr_redeemable_daily",
						name: "total"
					},
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
						ghost: true,
						data: "teletan_redeemable_daily",
						name: "total"
					},
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
						ghost: true,
						data: "qr_redeemable_7days_sum",
						name: "total"
					},
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
						ghost: true,
						data: "teletan_redeemable_7days_sum",
						name: "total"
					},
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
		],
		"4": [
			{
				"series": [
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_7days_avg"
					},
					{
						color: "#6A1B4D",
						data: "qr_redeemable_7days_avg"
					},
					{
						color: "#B2578D",
						data: "teletan_redeemable_7days_avg"
					},
					{
						color: "#D68101",
						data: "qr_teletan_redeemable_daily"
					},
					{
						color: "#6A1B4D",
						data: "qr_redeemable_daily"
					},
					{
						color: "#B2578D",
						data: "teletan_redeemable_daily"
					}
				]
			},
			{
				"series": [
					{
						ghost: true,
						data: "qr_redeemable_7days_avg",
						name: "total"
					},
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_7days_avg"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_7days_avg"
					},
					{
						ghost: true,
						data: "qr_redeemable_daily",
						name: "total"
					},
					{
						color: "#57DAFF",
						data: "qr_not_redeemed_daily"
					},
					{
						color: "#3BA8CE",
						data: "qr_redeemed_daily"
					}
				]
			},
			{
				"series": [
					{
						ghost: true,
						data: "teletan_redeemable_7days_avg",
						name: "total"
					},
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_7days_avg"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_7days_avg"
					},
					{
						ghost: true,
						data: "teletan_redeemable_daily",
						name: "total"
					},
					{
						color: "#57DAFF",
						data: "teletan_not_redeemed_daily"
					},
					{
						color: "#3BA8CE",
						data: "teletan_redeemed_daily"
					}
				]
			}
		]
	},
	"chart3": {
		"1": {
			"series": [
				{
					ghost: true,
					data: "ppa_total_warnings_cumulated"
				},
				{
					color: "#FF6666",
					data: "ppa_risk_red_cumulated"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_cumulated"
				}
			],
			"stacked": true,
			"type":"area",
			"ghostTooltip": "ppa_total_warnings_cumulated"
		},
		"2": {
			"series": [
				{
					ghost: true,
					data: "ppa_total_warnings_daily"
				},
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
			"type":"bar",
			"ghostTooltip": "ppa_total_warnings_daily"
		},
		"3": {
			"series": [
				{
					ghost: true,
					data: "ppa_total_warnings_7days_sum"
				},
				{
					color: "#FF6666",
					data: "ppa_risk_red_7days_sum"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_7days_sum"
				}
			],
			"stacked": true,
			"type":"bar",
			"ghostTooltip": "ppa_total_warnings_7days_sum"
		},
		"4": {
			"series": [
				{
					ghost: true,
					data: "ppa_total_warnings_7days_avg"
				},
				{
					color: "#FF6666",
					data: "ppa_risk_red_7days_avg"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_7days_avg"
				},
				{
					ghost: true,
					data: "ppa_total_warnings_daily"
				},
				{
					color: "#FF6666",
					data: "ppa_risk_red_daily"
				},
				{
					color: "#50DBB4",
					data: "ppa_risk_green_daily"
				}
			]
		}		
	}
};