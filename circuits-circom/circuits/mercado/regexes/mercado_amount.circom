pragma circom 2.1.5;

include "@zk-email/zk-regex-circom/circuits/regex_helpers.circom";

template MercadoAmountRegex(msg_bytes) {
	signal input msg[msg_bytes];
	signal output out;

	var num_bytes = msg_bytes+1;
	signal in[num_bytes];
	in[0]<==255;
	for (var i = 0; i < msg_bytes; i++) {
		in[i+1] <== msg[i];
	}

	component eq[21][num_bytes];
	component and[45][num_bytes];
	component multi_or[11][num_bytes];
	signal states[num_bytes+1][33];
	component state_changed[num_bytes];

	states[0][0] <== 1;
	for (var i = 1; i < 33; i++) {
		states[0][i] <== 0;
	}

	for (var i = 0; i < num_bytes; i++) {
		state_changed[i] = MultiOR(32);
		eq[0][i] = IsEqual();
		eq[0][i].in[0] <== in[i];
		eq[0][i].in[1] <== 48;
		eq[1][i] = IsEqual();
		eq[1][i].in[0] <== in[i];
		eq[1][i].in[1] <== 49;
		eq[2][i] = IsEqual();
		eq[2][i].in[0] <== in[i];
		eq[2][i].in[1] <== 50;
		eq[3][i] = IsEqual();
		eq[3][i].in[0] <== in[i];
		eq[3][i].in[1] <== 51;
		eq[4][i] = IsEqual();
		eq[4][i].in[0] <== in[i];
		eq[4][i].in[1] <== 52;
		eq[5][i] = IsEqual();
		eq[5][i].in[0] <== in[i];
		eq[5][i].in[1] <== 53;
		eq[6][i] = IsEqual();
		eq[6][i].in[0] <== in[i];
		eq[6][i].in[1] <== 54;
		eq[7][i] = IsEqual();
		eq[7][i].in[0] <== in[i];
		eq[7][i].in[1] <== 55;
		eq[8][i] = IsEqual();
		eq[8][i].in[0] <== in[i];
		eq[8][i].in[1] <== 56;
		eq[9][i] = IsEqual();
		eq[9][i].in[0] <== in[i];
		eq[9][i].in[1] <== 57;
		and[0][i] = AND();
		and[0][i].a <== states[i][1];
		multi_or[0][i] = MultiOR(10);
		multi_or[0][i].in[0] <== eq[0][i].out;
		multi_or[0][i].in[1] <== eq[1][i].out;
		multi_or[0][i].in[2] <== eq[2][i].out;
		multi_or[0][i].in[3] <== eq[3][i].out;
		multi_or[0][i].in[4] <== eq[4][i].out;
		multi_or[0][i].in[5] <== eq[5][i].out;
		multi_or[0][i].in[6] <== eq[6][i].out;
		multi_or[0][i].in[7] <== eq[7][i].out;
		multi_or[0][i].in[8] <== eq[8][i].out;
		multi_or[0][i].in[9] <== eq[9][i].out;
		and[0][i].b <== multi_or[0][i].out;
		eq[10][i] = IsEqual();
		eq[10][i].in[0] <== in[i];
		eq[10][i].in[1] <== 10;
		and[1][i] = AND();
		and[1][i].a <== states[i][6];
		and[1][i].b <== eq[10][i].out;
		and[2][i] = AND();
		and[2][i].a <== states[i][11];
		and[2][i].b <== multi_or[0][i].out;
		multi_or[1][i] = MultiOR(3);
		multi_or[1][i].in[0] <== and[0][i].out;
		multi_or[1][i].in[1] <== and[1][i].out;
		multi_or[1][i].in[2] <== and[2][i].out;
		states[i+1][1] <== multi_or[1][i].out;
		state_changed[i].in[0] <== states[i+1][1];
		eq[11][i] = IsEqual();
		eq[11][i].in[0] <== in[i];
		eq[11][i].in[1] <== 61;
		and[3][i] = AND();
		and[3][i].a <== states[i][1];
		and[3][i].b <== eq[11][i].out;
		and[4][i] = AND();
		and[4][i].a <== states[i][11];
		and[4][i].b <== eq[11][i].out;
		multi_or[2][i] = MultiOR(2);
		multi_or[2][i].in[0] <== and[3][i].out;
		multi_or[2][i].in[1] <== and[4][i].out;
		states[i+1][2] <== multi_or[2][i].out;
		state_changed[i].in[1] <== states[i+1][2];
		eq[12][i] = IsEqual();
		eq[12][i].in[0] <== in[i];
		eq[12][i].in[1] <== 13;
		and[5][i] = AND();
		and[5][i].a <== states[i][32];
		and[5][i].b <== eq[12][i].out;
		states[i+1][3] <== and[5][i].out;
		state_changed[i].in[2] <== states[i+1][3];
		eq[13][i] = IsEqual();
		eq[13][i].in[0] <== in[i];
		eq[13][i].in[1] <== 32;
		and[6][i] = AND();
		and[6][i].a <== states[i][4];
		and[6][i].b <== eq[13][i].out;
		and[7][i] = AND();
		and[7][i].a <== states[i][25];
		and[7][i].b <== eq[13][i].out;
		and[8][i] = AND();
		and[8][i].a <== states[i][31];
		and[8][i].b <== eq[10][i].out;
		multi_or[3][i] = MultiOR(3);
		multi_or[3][i].in[0] <== and[6][i].out;
		multi_or[3][i].in[1] <== and[7][i].out;
		multi_or[3][i].in[2] <== and[8][i].out;
		states[i+1][4] <== multi_or[3][i].out;
		state_changed[i].in[3] <== states[i+1][4];
		and[9][i] = AND();
		and[9][i].a <== states[i][1];
		and[9][i].b <== eq[13][i].out;
		and[10][i] = AND();
		and[10][i].a <== states[i][5];
		and[10][i].b <== eq[13][i].out;
		and[11][i] = AND();
		and[11][i].a <== states[i][12];
		and[11][i].b <== eq[10][i].out;
		multi_or[4][i] = MultiOR(3);
		multi_or[4][i].in[0] <== and[9][i].out;
		multi_or[4][i].in[1] <== and[10][i].out;
		multi_or[4][i].in[2] <== and[11][i].out;
		states[i+1][5] <== multi_or[4][i].out;
		state_changed[i].in[4] <== states[i+1][5];
		and[12][i] = AND();
		and[12][i].a <== states[i][2];
		and[12][i].b <== eq[12][i].out;
		states[i+1][6] <== and[12][i].out;
		state_changed[i].in[5] <== states[i+1][6];
		and[13][i] = AND();
		and[13][i].a <== states[i][3];
		and[13][i].b <== eq[10][i].out;
		states[i+1][7] <== and[13][i].out;
		state_changed[i].in[6] <== states[i+1][7];
		and[14][i] = AND();
		and[14][i].a <== states[i][5];
		and[14][i].b <== eq[11][i].out;
		states[i+1][8] <== and[14][i].out;
		state_changed[i].in[7] <== states[i+1][8];
		eq[14][i] = IsEqual();
		eq[14][i].in[0] <== in[i];
		eq[14][i].in[1] <== 76;
		and[15][i] = AND();
		and[15][i].a <== states[i][0];
		and[15][i].b <== eq[14][i].out;
		states[i+1][9] <== and[15][i].out;
		state_changed[i].in[8] <== states[i+1][9];
		eq[15][i] = IsEqual();
		eq[15][i].in[0] <== in[i];
		eq[15][i].in[1] <== 113;
		and[16][i] = AND();
		and[16][i].a <== states[i][5];
		and[16][i].b <== eq[15][i].out;
		states[i+1][10] <== and[16][i].out;
		state_changed[i].in[9] <== states[i+1][10];
		and[17][i] = AND();
		and[17][i].a <== states[i][7];
		and[17][i].b <== eq[13][i].out;
		and[18][i] = AND();
		and[18][i].a <== states[i][30];
		and[18][i].b <== eq[13][i].out;
		multi_or[5][i] = MultiOR(2);
		multi_or[5][i].in[0] <== and[17][i].out;
		multi_or[5][i].in[1] <== and[18][i].out;
		states[i+1][11] <== multi_or[5][i].out;
		state_changed[i].in[10] <== states[i+1][11];
		and[19][i] = AND();
		and[19][i].a <== states[i][8];
		and[19][i].b <== eq[12][i].out;
		states[i+1][12] <== and[19][i].out;
		state_changed[i].in[11] <== states[i+1][12];
		and[20][i] = AND();
		and[20][i].a <== states[i][10];
		and[20][i].b <== eq[11][i].out;
		states[i+1][13] <== and[20][i].out;
		state_changed[i].in[12] <== states[i+1][13];
		eq[16][i] = IsEqual();
		eq[16][i].in[0] <== in[i];
		eq[16][i].in[1] <== 117;
		and[21][i] = AND();
		and[21][i].a <== states[i][10];
		and[21][i].b <== eq[16][i].out;
		states[i+1][14] <== and[21][i].out;
		state_changed[i].in[13] <== states[i+1][14];
		and[22][i] = AND();
		and[22][i].a <== states[i][13];
		and[22][i].b <== eq[12][i].out;
		states[i+1][15] <== and[22][i].out;
		state_changed[i].in[14] <== states[i+1][15];
		and[23][i] = AND();
		and[23][i].a <== states[i][14];
		and[23][i].b <== eq[11][i].out;
		states[i+1][16] <== and[23][i].out;
		state_changed[i].in[15] <== states[i+1][16];
		eq[17][i] = IsEqual();
		eq[17][i].in[0] <== in[i];
		eq[17][i].in[1] <== 101;
		and[24][i] = AND();
		and[24][i].a <== states[i][14];
		and[24][i].b <== eq[17][i].out;
		and[25][i] = AND();
		and[25][i].a <== states[i][20];
		and[25][i].b <== eq[17][i].out;
		multi_or[6][i] = MultiOR(2);
		multi_or[6][i].in[0] <== and[24][i].out;
		multi_or[6][i].in[1] <== and[25][i].out;
		states[i+1][17] <== multi_or[6][i].out;
		state_changed[i].in[16] <== states[i+1][17];
		and[26][i] = AND();
		and[26][i].a <== states[i][15];
		and[26][i].b <== eq[10][i].out;
		states[i+1][18] <== and[26][i].out;
		state_changed[i].in[17] <== states[i+1][18];
		and[27][i] = AND();
		and[27][i].a <== states[i][16];
		and[27][i].b <== eq[12][i].out;
		states[i+1][19] <== and[27][i].out;
		state_changed[i].in[18] <== states[i+1][19];
		and[28][i] = AND();
		and[28][i].a <== states[i][18];
		and[28][i].b <== eq[16][i].out;
		and[29][i] = AND();
		and[29][i].a <== states[i][19];
		and[29][i].b <== eq[10][i].out;
		multi_or[7][i] = MultiOR(2);
		multi_or[7][i].in[0] <== and[28][i].out;
		multi_or[7][i].in[1] <== and[29][i].out;
		states[i+1][20] <== multi_or[7][i].out;
		state_changed[i].in[19] <== states[i+1][20];
		and[30][i] = AND();
		and[30][i].a <== states[i][9];
		and[30][i].b <== eq[11][i].out;
		states[i+1][21] <== and[30][i].out;
		state_changed[i].in[20] <== states[i+1][21];
		eq[18][i] = IsEqual();
		eq[18][i].in[0] <== in[i];
		eq[18][i].in[1] <== 111;
		and[31][i] = AND();
		and[31][i].a <== states[i][9];
		and[31][i].b <== eq[18][i].out;
		states[i+1][22] <== and[31][i].out;
		state_changed[i].in[21] <== states[i+1][22];
		and[32][i] = AND();
		and[32][i].a <== states[i][21];
		and[32][i].b <== eq[12][i].out;
		states[i+1][23] <== and[32][i].out;
		state_changed[i].in[22] <== states[i+1][23];
		and[33][i] = AND();
		and[33][i].a <== states[i][22];
		and[33][i].b <== eq[11][i].out;
		states[i+1][24] <== and[33][i].out;
		state_changed[i].in[23] <== states[i+1][24];
		eq[19][i] = IsEqual();
		eq[19][i].in[0] <== in[i];
		eq[19][i].in[1] <== 115;
		and[34][i] = AND();
		and[34][i].a <== states[i][22];
		and[34][i].b <== eq[19][i].out;
		and[35][i] = AND();
		and[35][i].a <== states[i][29];
		and[35][i].b <== eq[19][i].out;
		multi_or[8][i] = MultiOR(2);
		multi_or[8][i].in[0] <== and[34][i].out;
		multi_or[8][i].in[1] <== and[35][i].out;
		states[i+1][25] <== multi_or[8][i].out;
		state_changed[i].in[24] <== states[i+1][25];
		and[36][i] = AND();
		and[36][i].a <== states[i][23];
		and[36][i].b <== eq[10][i].out;
		states[i+1][26] <== and[36][i].out;
		state_changed[i].in[25] <== states[i+1][26];
		and[37][i] = AND();
		and[37][i].a <== states[i][24];
		and[37][i].b <== eq[12][i].out;
		states[i+1][27] <== and[37][i].out;
		state_changed[i].in[26] <== states[i+1][27];
		and[38][i] = AND();
		and[38][i].a <== states[i][4];
		and[38][i].b <== eq[11][i].out;
		and[39][i] = AND();
		and[39][i].a <== states[i][25];
		and[39][i].b <== eq[11][i].out;
		multi_or[9][i] = MultiOR(2);
		multi_or[9][i].in[0] <== and[38][i].out;
		multi_or[9][i].in[1] <== and[39][i].out;
		states[i+1][28] <== multi_or[9][i].out;
		state_changed[i].in[27] <== states[i+1][28];
		and[40][i] = AND();
		and[40][i].a <== states[i][26];
		and[40][i].b <== eq[18][i].out;
		and[41][i] = AND();
		and[41][i].a <== states[i][27];
		and[41][i].b <== eq[10][i].out;
		multi_or[10][i] = MultiOR(2);
		multi_or[10][i].in[0] <== and[40][i].out;
		multi_or[10][i].in[1] <== and[41][i].out;
		states[i+1][29] <== multi_or[10][i].out;
		state_changed[i].in[28] <== states[i+1][29];
		eq[20][i] = IsEqual();
		eq[20][i].in[0] <== in[i];
		eq[20][i].in[1] <== 36;
		and[42][i] = AND();
		and[42][i].a <== states[i][4];
		and[42][i].b <== eq[20][i].out;
		states[i+1][30] <== and[42][i].out;
		state_changed[i].in[29] <== states[i+1][30];
		and[43][i] = AND();
		and[43][i].a <== states[i][28];
		and[43][i].b <== eq[12][i].out;
		states[i+1][31] <== and[43][i].out;
		state_changed[i].in[30] <== states[i+1][31];
		and[44][i] = AND();
		and[44][i].a <== states[i][30];
		and[44][i].b <== eq[11][i].out;
		states[i+1][32] <== and[44][i].out;
		state_changed[i].in[31] <== states[i+1][32];
		states[i+1][0] <== 1 - state_changed[i].out;
	}

	component final_state_result = MultiOR(num_bytes+1);
	for (var i = 0; i <= num_bytes; i++) {
		final_state_result.in[i] <== states[i][17];
	}
	out <== final_state_result.out;

	signal is_consecutive[msg_bytes+1][2];
	is_consecutive[msg_bytes][1] <== 1;
	for (var i = 0; i < msg_bytes; i++) {
		is_consecutive[msg_bytes-1-i][0] <== states[num_bytes-i][17] * (1 - is_consecutive[msg_bytes-i][1]) + is_consecutive[msg_bytes-i][1];
		is_consecutive[msg_bytes-1-i][1] <== state_changed[msg_bytes-i].out * is_consecutive[msg_bytes-1-i][0];
	}
	signal is_substr0[msg_bytes][7];
	signal is_reveal0[msg_bytes];
	signal output reveal0[msg_bytes];
	for (var i = 0; i < msg_bytes; i++) {
		is_substr0[i][0] <== 0;
		is_substr0[i][1] <== is_substr0[i][0] + states[i+1][1] * states[i+2][1];
		is_substr0[i][2] <== is_substr0[i][1] + states[i+1][1] * states[i+2][2];
		is_substr0[i][3] <== is_substr0[i][2] + states[i+1][2] * states[i+2][6];
		is_substr0[i][4] <== is_substr0[i][3] + states[i+1][6] * states[i+2][1];
		is_substr0[i][5] <== is_substr0[i][4] + states[i+1][11] * states[i+2][1];
		is_substr0[i][6] <== is_substr0[i][5] + states[i+1][11] * states[i+2][2];
		is_reveal0[i] <== is_substr0[i][6] * is_consecutive[i][1];
		reveal0[i] <== in[i+1] * is_reveal0[i];
	}
}