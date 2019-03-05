let data = new Float32Array(
[-5,13,20,-5,13,0,-5,-7,0,-5,13,20,-5,-7,0,-5,-7,20,12.003000259399414,0,20,15,13,20,11.65999984741211,3.0910000801086426,20,5,
10.003000259399414,20,15,13,20,-5,13,20,-5,-7,0,-0.6650000214576721,-5.879000186920166,0,0.11964934319257736,-7,0,14.95199966430664,
-7.980000019073486,20,9.880351066589355,-7,20,14.807999610900879,-8.951000213623047,20,14.95199966430664,
-7.980000019073486,0,14.95199966430664,-7.980000019073486,20,14.807999610900879,-8.951000213623047,0,-1.659999966621399,
-3.0910000801086426,0,-0.6650000214576721,-5.879000186920166,0,-5,-7,0,14.807999610900879,-8.951000213623047,20,9.880351066589355,
-7,20,14.569000244140625,-9.902999877929688,20,10.555999755859375,-15.3149995803833,20,11.343999862670898,-14.729999542236328,
20,7.164000034332275,-9.512999534606934,20,11.343999862670898,-14.729999542236328,20,12.071000099182129,-14.071000099182129,
20,7.164000034332275,-9.512999534606934,20,12.071000099182129,-14.071000099182129,20,12.729999542236328,-13.343999862670898,
20,7.164000034332275,-9.512999534606934,20,12.729999542236328,-13.343999862670898,20,13.3149995803833,-12.555999755859375,20,
7.164000034332275,-9.512999534606934,20,9.116000175476074,-8.092000007629395,20,7.164000034332275,-9.512999534606934,20,
13.3149995803833,-12.555999755859375,20,13.3149995803833,-12.555999755859375,20,13.819000244140625,-11.71399974822998,20,
9.116000175476074,-8.092000007629395,20,13.819000244140625,-11.71399974822998,20,14.23900032043457,-10.82699966430664,20,
9.116000175476074,-8.092000007629395,20,14.569000244140625,-9.902999877929688,20,9.116000175476074,-8.092000007629395,20,
14.23900032043457,-10.82699966430664,20,9.880351066589355,-7,0,10.664999961853027,-5.879000186920166,0,15,-7,0,-5,13,0,
-0.6650000214576721,5.879000186920166,0,-1.659999966621399,3.0910000801086426,0,8.82699966430664,-16.23900032043457,0,
7.164000034332275,-9.512999534606934,0,9.71399974822998,-15.819000244140625,0,13.819000244140625,-11.71399974822998,0,
13.3149995803833,-12.555999755859375,0,9.116000175476074,-8.092000007629395,0,9.71399974822998,-15.819000244140625,0,
7.164000034332275,-9.512999534606934,0,10.555999755859375,-15.3149995803833,0,12.729999542236328,-13.343999862670898,0,
7.164000034332275,-9.512999534606934,0,13.3149995803833,-12.555999755859375,0,12.729999542236328,-13.343999862670898,0,
12.071000099182129,-14.071000099182129,0,7.164000034332275,-9.512999534606934,0,11.343999862670898,-14.729999542236328,0,
7.164000034332275,-9.512999534606934,0,12.071000099182129,-14.071000099182129,0,10.555999755859375,-15.3149995803833,0,
7.164000034332275,-9.512999534606934,0,11.343999862670898,-14.729999542236328,0,5,-17,0,4.019999980926514,-16.95199966430664,
0,5,-10.003000259399414,0,5,-10.003000259399414,0,2.8359999656677246,-9.512999534606934,0,5,-10.003000259399414,20,
2.8359999656677246,-9.512999534606934,20,5,-10.003000259399414,20,2.8359999656677246,-9.512999534606934,0,0.8840000033378601,
-8.092000007629395,0,0.8840000033378601,-8.092000007629395,20,2.8359999656677246,-9.512999534606934,20,2.8359999656677246,
-9.512999534606934,20,2.8359999656677246,-9.512999534606934,0,0.8840000033378601,-8.092000007629395,0,7.9029998779296875,
-16.569000244140625,0,5,-10.003000259399414,0,8.82699966430664,-16.23900032043457,0,0.8840000033378601,-8.092000007629395,
0,0.11964934319257736,-7,0,0.11964934319257736,-7,20,0.8840000033378601,-8.092000007629395,20,0.8840000033378601,
-8.092000007629395,0,0.11964934319257736,-7,20,7.164000034332275,-9.512999534606934,20,7.164000034332275,-9.512999534606934,
0,5,-10.003000259399414,0,5,-10.003000259399414,0,5,-10.003000259399414,20,7.164000034332275,-9.512999534606934,20,
0.28600001335144043,-15.819000244140625,0,0.28600001335144043,-15.819000244140625,20,-0.5559999942779541,-15.3149995803833,
0,-0.5559999942779541,-15.3149995803833,0,-0.5559999942779541,-15.3149995803833,20,-1.343999981880188,-14.729999542236328,0,
-1.343999981880188,-14.729999542236328,20,-1.343999981880188,-14.729999542236328,0,-0.5559999942779541,-15.3149995803833,20,
-2.071000099182129,-14.071000099182129,20,-2.071000099182129,-14.071000099182129,0,-1.343999981880188,-14.729999542236328,0,
-2.071000099182129,-14.071000099182129,20,-1.343999981880188,-14.729999542236328,0,-1.343999981880188,-14.729999542236328,20,
-3.315000057220459,-12.555999755859375,20,-3.315000057220459,-12.555999755859375,0,-2.7300000190734863,-13.343999862670898,20,
-2.071000099182129,-14.071000099182129,0,-2.071000099182129,-14.071000099182129,20,-2.7300000190734863,-13.343999862670898,0,
-2.7300000190734863,-13.343999862670898,20,-2.7300000190734863,-13.343999862670898,0,-2.071000099182129,-14.071000099182129,20,
7.164000034332275,9.512999534606934,0,15,13,0,9.116000175476074,8.092000007629395,0,-3.819000005722046,-11.71399974822998,20,
-3.315000057220459,-12.555999755859375,0,-3.315000057220459,-12.555999755859375,20,-3.315000057220459,-12.555999755859375,0,
-2.7300000190734863,-13.343999862670898,0,-2.7300000190734863,-13.343999862670898,20,10.664999961853027,5.879000186920166,0,15,
13,0,11.65999984741211,3.0910000801086426,0,-3.819000005722046,-11.71399974822998,20,-3.819000005722046,-11.71399974822998,0,
-3.315000057220459,-12.555999755859375,0,10.664999961853027,5.879000186920166,0,9.116000175476074,8.092000007629395,0,15,13,0,
-5,13,0,15,13,0,5,10.003000259399414,0,2.8359999656677246,9.512999534606934,0,-5,13,0,5,10.003000259399414,0,7.164000034332275,
9.512999534606934,0,5,10.003000259399414,0,15,13,0,-4.238999843597412,-10.82699966430664,20,-4.238999843597412,-10.82699966430664,
0,-3.819000005722046,-11.71399974822998,0,-4.238999843597412,-10.82699966430664,20,-3.819000005722046,-11.71399974822998,0,
-3.819000005722046,-11.71399974822998,20,15,-7,0,10.664999961853027,-5.879000186920166,0,11.65999984741211,-3.0910000801086426,
0,15,-7,0,11.65999984741211,-3.0910000801086426,0,12.003000259399414,0,0,12.003000259399414,0,0,11.65999984741211,
3.0910000801086426,0,15,13,0,15,-7,0,12.003000259399414,0,0,15,13,0,11.65999984741211,-3.0910000801086426,20,15,-7,
20,12.003000259399414,0,20,15,13,20,12.003000259399414,0,20,15,-7,20,-4.238999843597412,-10.82699966430664,0,-4.238999843597412,
-10.82699966430664,20,-4.568999767303467,-9.902999877929688,0,-4.568999767303467,-9.902999877929688,20,-4.568999767303467,
-9.902999877929688,0,-4.238999843597412,-10.82699966430664,20,2.8359999656677246,9.512999534606934,0,0.8840000033378601,
8.092000007629395,0,-5,13,0,0.8840000033378601,8.092000007629395,0,-0.6650000214576721,5.879000186920166,0,-5,13,0,
-1.659999966621399,3.0910000801086426,0,-2.003000020980835,-2.0490146275390416e-15,0,-5,13,0,-5,-7,0,-5,13,0,-2.003000020980835,
-2.0490146275390416e-15,0,-2.003000020980835,-2.0490146275390416e-15,0,-1.659999966621399,-3.0910000801086426,0,-5,-7,
0,-4.808000087738037,-8.951000213623047,20,-4.808000087738037,-8.951000213623047,0,-4.568999767303467,-9.902999877929688,
20,-4.808000087738037,-8.951000213623047,0,-4.568999767303467,-9.902999877929688,0,-4.568999767303467,-9.902999877929688,
20,-4.808000087738037,-8.951000213623047,0,-4.808000087738037,-8.951000213623047,20,-4.952000141143799,-7.980000019073486,
20,-4.952000141143799,-7.980000019073486,20,-4.952000141143799,-7.980000019073486,0,-4.808000087738037,-8.951000213623047,0,
-5,-7,20,-5,-7,0,-4.952000141143799,-7.980000019073486,20,-5,-7,0,-4.952000141143799,-7.980000019073486,0,-4.952000141143799,
-7.980000019073486,20,0.8840000033378601,-8.092000007629395,20,-3.315000057220459,-12.555999755859375,20,2.8359999656677246,
-9.512999534606934,20,-1.659999966621399,3.0910000801086426,20,-5,13,20,-2.003000020980835,0,20,-1.659999966621399,
3.0910000801086426,20,-0.6650000214576721,5.879000186920166,20,-5,13,20,-5,-7,20,-2.003000020980835,0,20,-5,13,20,
7.9029998779296875,-16.569000244140625,20,8.82699966430664,-16.23900032043457,20,5,-10.003000259399414,20,-5,13,20,
15,13,20,-5,13,0,15,13,0,-5,13,0,15,13,20,13.819000244140625,-11.71399974822998,0,13.3149995803833,-12.555999755859375,20,
13.3149995803833,-12.555999755859375,0,-0.6650000214576721,-5.879000186920166,0,-0.6650000214576721,-5.879000186920166,20,
0.11964934319257736,-7,20,-0.6650000214576721,-5.879000186920166,0,0.11964934319257736,-7,20,0.11964934319257736,-7,0,
13.3149995803833,-12.555999755859375,20,12.729999542236328,-13.343999862670898,0,13.3149995803833,-12.555999755859375,0,
-0.5559999942779541,-15.3149995803833,20,0.28600001335144043,-15.819000244140625,20,2.8359999656677246,-9.512999534606934,
20,0.28600001335144043,-15.819000244140625,20,1.1729999780654907,-16.23900032043457,20,2.8359999656677246,-9.512999534606934,
20,5,-10.003000259399414,20,2.8359999656677246,-9.512999534606934,20,1.1729999780654907,-16.23900032043457,20,
1.1729999780654907,-16.23900032043457,20,2.0969998836517334,-16.569000244140625,20,5,-10.003000259399414,20,
2.0969998836517334,-16.569000244140625,20,3.0490000247955322,-16.808000564575195,20,5,-10.003000259399414,20,
3.0490000247955322,-16.808000564575195,20,4.019999980926514,-16.95199966430664,20,5,-10.003000259399414,20,4.019999980926514,
-16.95199966430664,20,5,-17,20,5,-10.003000259399414,20,5,-17,20,5.980000019073486,-16.95199966430664,20,5,-10.003000259399414,
20,5.980000019073486,-16.95199966430664,20,6.951000213623047,-16.808000564575195,20,5,-10.003000259399414,20,
7.9029998779296875,-16.569000244140625,20,5,-10.003000259399414,20,6.951000213623047,-16.808000564575195,20,
-1.659999966621399,-3.0910000801086426,0,-1.659999966621399,-3.0910000801086426,20,-0.6650000214576721,-5.879000186920166,
20,-1.659999966621399,-3.0910000801086426,0,-0.6650000214576721,-5.879000186920166,20,-0.6650000214576721,-5.879000186920166,
0,-1.659999966621399,-3.0910000801086426,20,-1.659999966621399,-3.0910000801086426,0,-2.003000020980835,-2.0490146275390416e-15,
0,-1.659999966621399,-3.0910000801086426,20,-2.003000020980835,-2.0490146275390416e-15,0,-2.003000020980835,0,20,
12.729999542236328,-13.343999862670898,0,12.071000099182129,-14.071000099182129,20,12.071000099182129,-14.071000099182129,
0,11.65999984741211,-3.0910000801086426,0,11.65999984741211,-3.0910000801086426,20,12.003000259399414,0,20,11.65999984741211,
-3.0910000801086426,0,12.003000259399414,0,20,12.003000259399414,0,0,11.343999862670898,-14.729999542236328,0,
12.071000099182129,-14.071000099182129,0,11.343999862670898,-14.729999542236328,20,12.071000099182129,-14.071000099182129,
20,11.343999862670898,-14.729999542236328,20,12.071000099182129,-14.071000099182129,0,10.664999961853027,-5.879000186920166,
0,10.664999961853027,-5.879000186920166,20,11.65999984741211,-3.0910000801086426,20,10.664999961853027,-5.879000186920166,0,
11.65999984741211,-3.0910000801086426,20,11.65999984741211,-3.0910000801086426,0,11.343999862670898,-14.729999542236328,20,
10.555999755859375,-15.3149995803833,20,10.555999755859375,-15.3149995803833,0,11.343999862670898,-14.729999542236328,20,
10.555999755859375,-15.3149995803833,0,11.343999862670898,-14.729999542236328,0,6.951000213623047,-16.808000564575195,0,
7.9029998779296875,-16.569000244140625,0,6.951000213623047,-16.808000564575195,20,7.9029998779296875,-16.569000244140625,20,
6.951000213623047,-16.808000564575195,20,7.9029998779296875,-16.569000244140625,0,-4.568999767303467,-9.902999877929688,20,
0.11964934319257736,-7,20,-4.808000087738037,-8.951000213623047,20,-4.952000141143799,-7.980000019073486,20,-4.808000087738037,
-8.951000213623047,20,0.11964934319257736,-7,20,-4.238999843597412,-10.82699966430664,20,0.8840000033378601,-8.092000007629395,20,
-4.568999767303467,-9.902999877929688,20,-3.819000005722046,-11.71399974822998,20,0.8840000033378601,-8.092000007629395,20,-4.238999843597412,-10.82699966430664,20,-3.315000057220459,-12.555999755859375,20,0.8840000033378601,-8.092000007629395,20,-3.819000005722046,-11.71399974822998,20,-2.7300000190734863,-13.343999862670898,20,2.8359999656677246,-9.512999534606934,20,-3.315000057220459,-12.555999755859375,20,-0.5559999942779541,-15.3149995803833,20,2.8359999656677246,-9.512999534606934,20,-1.343999981880188,-14.729999542236328,20,-2.071000099182129,-14.071000099182129,20,-1.343999981880188,-14.729999542236328,20,2.8359999656677246,-9.512999534606934,20,-2.071000099182129,-14.071000099182129,20,2.8359999656677246,-9.512999534606934,20,-2.7300000190734863,-13.343999862670898,20,0.11964934319257736,-7,20,-4.568999767303467,-9.902999877929688,20,0.8840000033378601,-8.092000007629395,20,-5,-7,20,-4.952000141143799,-7.980000019073486,20,0.11964934319257736,-7,20,9.880351066589355,-7,0,9.880351066589355,-7,20,10.664999961853027,-5.879000186920166,0,10.664999961853027,-5.879000186920166,20,10.664999961853027,-5.879000186920166,0,9.880351066589355,-7,20,9.71399974822998,-15.819000244140625,0,10.555999755859375,-15.3149995803833,0,9.71399974822998,-15.819000244140625,20,10.555999755859375,-15.3149995803833,20,9.71399974822998,-15.819000244140625,20,10.555999755859375,-15.3149995803833,0,6.951000213623047,-16.808000564575195,20,5.980000019073486,-16.95199966430664,20,5.980000019073486,-16.95199966430664,0,6.951000213623047,-16.808000564575195,20,5.980000019073486,-16.95199966430664,0,6.951000213623047,-16.808000564575195,0,15,-7,0,15,-7,20,14.95199966430664,-7.980000019073486,20,15,-7,0,14.95199966430664,-7.980000019073486,20,14.95199966430664,-7.980000019073486,0,-1.659999966621399,3.0910000801086426,0,-1.659999966621399,3.0910000801086426,20,-2.003000020980835,0,20,-1.659999966621399,3.0910000801086426,0,-2.003000020980835,0,20,-2.003000020980835,-2.0490146275390416e-15,0,8.82699966430664,-16.23900032043457,0,9.71399974822998,-15.819000244140625,0,8.82699966430664,-16.23900032043457,20,9.71399974822998,-15.819000244140625,20,8.82699966430664,-16.23900032043457,20,9.71399974822998,-15.819000244140625,0,5.980000019073486,-16.95199966430664,20,5,-17,20,5.980000019073486,-16.95199966430664,0,-0.6650000214576721,5.879000186920166,0,-0.6650000214576721,5.879000186920166,20,-1.659999966621399,3.0910000801086426,20,-0.6650000214576721,5.879000186920166,0,-1.659999966621399,3.0910000801086426,20,-1.659999966621399,3.0910000801086426,0,14.95199966430664,-7.980000019073486,20,14.807999610900879,-8.951000213623047,20,14.807999610900879,-8.951000213623047,0,8.82699966430664,-16.23900032043457,20,7.9029998779296875,-16.569000244140625,0,8.82699966430664,-16.23900032043457,0,0.8840000033378601,8.092000007629395,0,0.8840000033378601,8.092000007629395,20,-0.6650000214576721,5.879000186920166,20,0.8840000033378601,8.092000007629395,0,-0.6650000214576721,5.879000186920166,20,-0.6650000214576721,5.879000186920166,0,5,-17,20,4.019999980926514,-16.95199966430664,20,4.019999980926514,-16.95199966430664,0,14.807999610900879,-8.951000213623047,0,14.807999610900879,-8.951000213623047,20,14.569000244140625,-9.902999877929688,0,14.569000244140625,-9.902999877929688,20,14.569000244140625,-9.902999877929688,0,14.807999610900879,-8.951000213623047,20,2.8359999656677246,9.512999534606934,0,2.8359999656677246,9.512999534606934,20,0.8840000033378601,8.092000007629395,20,2.8359999656677246,9.512999534606934,0,0.8840000033378601,8.092000007629395,20,0.8840000033378601,8.092000007629395,0,4.019999980926514,-16.95199966430664,0,4.019999980926514,-16.95199966430664,20,3.0490000247955322,-16.808000564575195,0,3.0490000247955322,-16.808000564575195,20,3.0490000247955322,-16.808000564575195,0,4.019999980926514,-16.95199966430664,20,9.880351066589355,-7,20,9.880351066589355,-7,0,9.116000175476074,-8.092000007629395,0,14.569000244140625,-9.902999877929688,20,14.23900032043457,-10.82699966430664,20,14.569000244140625,-9.902999877929688,0,5,10.003000259399414,0,5,10.003000259399414,20,2.8359999656677246,9.512999534606934,20,5,10.003000259399414,0,2.8359999656677246,9.512999534606934,20,2.8359999656677246,9.512999534606934,0,3.0490000247955322,-16.808000564575195,20,2.0969998836517334,-16.569000244140625,20,2.0969998836517334,-16.569000244140625,0,3.0490000247955322,-16.808000564575195,20,2.0969998836517334,-16.569000244140625,0,3.0490000247955322,-16.808000564575195,0,7.164000034332275,9.512999534606934,0,7.164000034332275,9.512999534606934,20,5,10.003000259399414,20,7.164000034332275,9.512999534606934,0,5,10.003000259399414,20,5,10.003000259399414,0,14.23900032043457,-10.82699966430664,0,14.569000244140625,-9.902999877929688,0,14.23900032043457,-10.82699966430664,20,7.164000034332275,-9.512999534606934,20,9.116000175476074,-8.092000007629395,0,7.164000034332275,-9.512999534606934,0,9.116000175476074,8.092000007629395,0,9.116000175476074,8.092000007629395,20,7.164000034332275,9.512999534606934,20,9.116000175476074,8.092000007629395,0,7.164000034332275,9.512999534606934,20,7.164000034332275,9.512999534606934,0,1.1729999780654907,-16.23900032043457,0,2.0969998836517334,-16.569000244140625,0,1.1729999780654907,-16.23900032043457,20,2.0969998836517334,-16.569000244140625,20,1.1729999780654907,-16.23900032043457,20,2.0969998836517334,-16.569000244140625,0,14.23900032043457,-10.82699966430664,0,14.23900032043457,-10.82699966430664,20,13.819000244140625,-11.71399974822998,0,13.819000244140625,-11.71399974822998,20,13.819000244140625,-11.71399974822998,0,14.23900032043457,-10.82699966430664,20,10.664999961853027,5.879000186920166,0,10.664999961853027,5.879000186920166,20,9.116000175476074,8.092000007629395,20,10.664999961853027,5.879000186920166,0,9.116000175476074,8.092000007629395,20,9.116000175476074,8.092000007629395,0,1.1729999780654907,-16.23900032043457,20,0.28600001335144043,-15.819000244140625,20,0.28600001335144043,-15.819000244140625,0,1.1729999780654907,-16.23900032043457,20,0.28600001335144043,-15.819000244140625,0,1.1729999780654907,-16.23900032043457,0,13.819000244140625,-11.71399974822998,20,13.3149995803833,-12.555999755859375,20,13.819000244140625,-11.71399974822998,0,11.65999984741211,3.0910000801086426,0,11.65999984741211,3.0910000801086426,20,10.664999961853027,5.879000186920166,20,11.65999984741211,3.0910000801086426,0,10.664999961853027,5.879000186920166,20,10.664999961853027,5.879000186920166,0,-0.5559999942779541,-15.3149995803833,20,-0.5559999942779541,-15.3149995803833,0,0.28600001335144043,-15.819000244140625,20,12.003000259399414,0,0,12.003000259399414,0,20,11.65999984741211,3.0910000801086426,20,12.003000259399414,0,0,11.65999984741211,3.0910000801086426,20,11.65999984741211,3.0910000801086426,0,12.729999542236328,-13.343999862670898,0,13.3149995803833,-12.555999755859375,20,12.729999542236328,-13.343999862670898,20,2.0969998836517334,-16.569000244140625,0,1.1729999780654907,-16.23900032043457,0,5,-10.003000259399414,0,0.28600001335144043,-15.819000244140625,0,2.8359999656677246,-9.512999534606934,0,1.1729999780654907,-16.23900032043457,0,-0.5559999942779541,-15.3149995803833,0,2.8359999656677246,-9.512999534606934,0,0.28600001335144043,-15.819000244140625,0,3.0490000247955322,-16.808000564575195,0,2.0969998836517334,-16.569000244140625,0,5,-10.003000259399414,0,2.8359999656677246,-9.512999534606934,0,5,-10.003000259399414,0,1.1729999780654907,-16.23900032043457,0,4.019999980926514,-16.95199966430664,0,3.0490000247955322,-16.808000564575195,0,5,-10.003000259399414,0,7.164000034332275,-9.512999534606934,0,8.82699966430664,-16.23900032043457,0,5,-10.003000259399414,0,7.9029998779296875,-16.569000244140625,0,6.951000213623047,-16.808000564575195,0,5,-10.003000259399414,0,5.980000019073486,-16.95199966430664,0,5,-10.003000259399414,0,6.951000213623047,-16.808000564575195,0,5,-17,0,5,-10.003000259399414,0,5.980000019073486,-16.95199966430664,0,12.729999542236328,-13.343999862670898,20,12.071000099182129,-14.071000099182129,20,12.729999542236328,-13.343999862670898,0,5,-17,20,5,-17,0,5.980000019073486,-16.95199966430664,0,7.164000034332275,-9.512999534606934,20,5,-10.003000259399414,20,8.82699966430664,-16.23900032043457,20,9.116000175476074,-8.092000007629395,20,14.569000244140625,-9.902999877929688,20,9.880351066589355,-7,20,9.880351066589355,-7,20,14.95199966430664,-7.980000019073486,20,15,-7,20,4.019999980926514,-16.95199966430664,0,5,-17,0,5,-17,20,9.71399974822998,-15.819000244140625,20,10.555999755859375,-15.3149995803833,20,7.164000034332275,-9.512999534606934,20,8.82699966430664,-16.23900032043457,20,9.71399974822998,-15.819000244140625,20,7.164000034332275,-9.512999534606934,20,-3.819000005722046,-11.71399974822998,0,-4.238999843597412,-10.82699966430664,0,0.8840000033378601,-8.092000007629395,0,2.8359999656677246,-9.512999534606934,0,-3.315000057220459,-12.555999755859375,0,0.8840000033378601,-8.092000007629395,0,-5,-7,0,0.11964934319257736,-7,0,-4.952000141143799,-7.980000019073486,0,-1.343999981880188,-14.729999542236328,0,2.8359999656677246,-9.512999534606934,0,-0.5559999942779541,-15.3149995803833,0,-2.071000099182129,-14.071000099182129,0,2.8359999656677246,-9.512999534606934,0,-1.343999981880188,-14.729999542236328,0,-2.7300000190734863,-13.343999862670898,0,2.8359999656677246,-9.512999534606934,0,-2.071000099182129,-14.071000099182129,0,-3.315000057220459,-12.555999755859375,0,2.8359999656677246,-9.512999534606934,0,-2.7300000190734863,-13.343999862670898,0,-3.819000005722046,-11.71399974822998,0,0.8840000033378601,-8.092000007629395,0,-3.315000057220459,-12.555999755859375,0,-4.238999843597412,-10.82699966430664,0,-4.568999767303467,-9.902999877929688,0,0.8840000033378601,-8.092000007629395,0,0.11964934319257736,-7,0,0.8840000033378601,-8.092000007629395,0,-4.568999767303467,-9.902999877929688,0,-4.568999767303467,-9.902999877929688,0,-4.808000087738037,-8.951000213623047,0,0.11964934319257736,-7,0,-4.952000141143799,-7.980000019073486,0,0.11964934319257736,-7,0,-4.808000087738037,-8.951000213623047,0,9.116000175476074,-8.092000007629395,0,13.3149995803833,-12.555999755859375,0,7.164000034332275,-9.512999534606934,0,15,-7,0,14.95199966430664,-7.980000019073486,0,9.880351066589355,-7,0,14.95199966430664,-7.980000019073486,0,14.807999610900879,-8.951000213623047,0,9.880351066589355,-7,0,15,-7,20,15,-7,0,15,13,20,15,13,0,15,13,20,15,-7,0,14.23900032043457,-10.82699966430664,0,13.819000244140625,-11.71399974822998,0,9.116000175476074,-8.092000007629395,0,14.807999610900879,-8.951000213623047,0,14.569000244140625,-9.902999877929688,0,9.880351066589355,-7,0,9.116000175476074,-8.092000007629395,0,9.880351066589355,-7,0,14.569000244140625,-9.902999877929688,0,14.569000244140625,-9.902999877929688,0,14.23900032043457,-10.82699966430664,0,9.116000175476074,-8.092000007629395,0,7.9029998779296875,-16.569000244140625,0,8.82699966430664,-16.23900032043457,20,7.9029998779296875,-16.569000244140625,20,-1.659999966621399,-3.0910000801086426,20,-5,-7,20,-0.6650000214576721,-5.879000186920166,20,9.116000175476074,-8.092000007629395,0,9.116000175476074,-8.092000007629395,20,9.880351066589355,-7,20,-2.003000020980835,0,20,-5,-7,20,-1.659999966621399,-3.0910000801086426,20,0.11964934319257736,-7,20,-0.6650000214576721,-5.879000186920166,20,-5,-7,20,7.164000034332275,-9.512999534606934,20,9.116000175476074,-8.092000007629395,20,9.116000175476074,-8.092000007629395,0,11.65999984741211,-3.0910000801086426,20,10.664999961853027,-5.879000186920166,20,15,-7,20,9.880351066589355,-7,20,15,-7,20,10.664999961853027,-5.879000186920166,20,0.8840000033378601,8.092000007629395,20,-5,13,20,-0.6650000214576721,5.879000186920166,20,2.8359999656677246,9.512999534606934,20,-5,13,20,0.8840000033378601,8.092000007629395,20,5,10.003000259399414,20,-5,13,20,2.8359999656677246,9.512999534606934,20,9.116000175476074,8.092000007629395,20,15,13,20,7.164000034332275,9.512999534606934,20,5,10.003000259399414,20,7.164000034332275,9.512999534606934,20,15,13,20,10.664999961853027,5.879000186920166,20,15,13,20,9.116000175476074,8.092000007629395,20,11.65999984741211,3.0910000801086426,20,15,13,20,10.664999961853027,5.879000186920166,20]
);
















const Module = require('./main');

Module.addOnPostRun(() => {
  let pathParams = {
    resolution: 0.5,
    boundryOffset: 10,

    tool: {
      diameter: 3,
      length: 40
    },

    stepoverDistance: 3, // Must be > step length
    zDepthMax: 0,
    zDepthStart: 25,
    zDepthStep: 25
  };

  let startTime = new Date();
  const iter = 1;

  console.log('Starting...');
  for(let i=0; i<iter; i++){
    var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    var dataPtr = Module._malloc(nDataBytes);
    var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
    dataHeap.set(new Uint8Array(data.buffer));

    let numOfTriangles = data.length / (3*3);

    const core = new Module.MachinistCore(dataHeap.byteOffset, numOfTriangles);

    let path = core.createSweepLinePath(pathParams);
    
    Module._free(dataHeap.byteOffset);
    core.delete();
    delete mapCreator;
  }

  let deltaTime = (new Date()) - startTime;
  console.log(`${deltaTime/iter} ms`);
});



























